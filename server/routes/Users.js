// Importation des dépendances nécessaires
const express = require('express');
const router = express.Router();

// Importation du module bcrypt pour le hachage des mots de passe
const bcrypt = require('bcrypt');

// Importation du middleware validateToken pour la validation du token d'authentification
const { validateToken } = require('../middlewares/AuthMiddleware');

// Importation de la fonction sign du module jsonwebtoken pour la création de tokens JWT
const { sign } = require('jsonwebtoken');

// Importation du modèle Users à partir du dossier models
const { Users } = require("../models");

// Route pour la création d'un nouvel utilisateur
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    
    // Hachage du mot de passe avec bcrypt
    bcrypt.hash(password, 10).then((hash) => {
        // Création d'un nouvel utilisateur avec le nom d'utilisateur et le mot de passe haché
        Users.create({
           username: username,
           password: hash, 
        });
        
        // Réponse JSON indiquant le succès de la création de l'utilisateur
        res.json("SUCCESS");
    });
});

// Route pour l'authentification de l'utilisateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await Users.findOne({ where: {username: username} });

    // Vérification si l'utilisateur existe
    if (!user) res.json({error: "Cet utilisateur n'existe pas"});

    // Comparaison du mot de passe fourni avec le mot de passe haché dans la base de données
    bcrypt.compare(password, user.password).then((match) => {
        // Vérification si les mots de passe correspondent
        if (!match) res.json({error: "Mot de passe incorrect"});

        // Création d'un token d'authentification avec le nom d'utilisateur et l'identifiant de l'utilisateur
        const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
        
        // Réponse JSON contenant le token d'authentification, le nom d'utilisateur et l'identifiant de l'utilisateur
        res.json({token: accessToken, username: username, id: user.id});
    });
});

// Route pour obtenir les informations d'authentification de l'utilisateur
router.get('/auth', validateToken, (req, res) => {
    // Réponse JSON contenant les informations de l'utilisateur extraites du token valide
    res.json(req.user);
});

// Route pour obtenir les informations de base d'un utilisateur en fonction de son identifiant
router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;

    // Recherche des informations de base de l'utilisateur dans la base de données en excluant le mot de passe
    const basicInfo = await Users.findByPk(id, {attributes: {exclude: ["password"]}});

    // Réponse JSON contenant les informations de base de l'utilisateur
    res.json(basicInfo);
});

// Route pour modifier le mot de passe de l'utilisateur
router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    // Recherche de l'utilisateur dans la base de données
    const user = await Users.findOne({where: {username: req.user.username} });
    
    // Comparaison du mot de passe actuel avec le mot de passe haché dans la base de données
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        // Vérification si les mots de passe correspondent
        if (!match) res.json({error: "Mauvais ancien mot de passe"});

        // Hachage du nouveau mot de passe
        bcrypt.hash(newPassword, 10).then((hash) => {
            // Mise à jour du mot de passe de l'utilisateur dans la base de données
            Users.update({password: hash}, {where: {username: req.user.username}});
            
            // Réponse JSON indiquant le succès de la modification du mot de passe
            res.json("SUCCESS");
        });
    });
});

// Exportation du routeur
module.exports = router;
