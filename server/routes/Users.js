//Logique router
//On appelle express car celui ci a déjà un système de router implémenté dans le framework

const express = require('express');
const router = express.Router();

//On appelle bcrypt pour le hashage des mots de passes

const bcrypt = require('bcrypt');

//On appelle validateToken pour vérifier que le token est bon pour pas que les utilisateurs puissent envoyer un faux token

const { validateToken } = require('../middlewares/AuthMiddleware')

//On appelle Json Web Token pour sécuriser l'authentification

const { sign } = require('jsonwebtoken');

//On récupérer une instance du models  posts 

const { Users } = require("../models");

//Insérer des informations dans notre database
//On fait une requête post à notre route user, ensuite on récupère les post data du body qui est envoyé dans la requête, ensuite on appelle la fonction sequalize create qui va insérer les données dans notre base mysql et pour finir on renvoi en tant que réponse les mêmes data qu'on a envoyé pour avoir une confirmation visuelle

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
           username: username,
           password: hash, 
        });
        res.json("SUCCESS");
    });
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({ where: {username: username} });

    if (!user) res.json({error: "Cet utilisateur n'existe pas"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "Mot de passe incorrect"});

        const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
        res.json({token: accessToken, username: username, id: user.id});
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {attributes: {exclude: ["password"]},});

    res.json(basicInfo);
});

router.put('/changepassword',validateToken ,async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where: {username: req.user.username} });
    
    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({error: "Mauvais ancien mot de passe"});

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {where: {username: req.user.username}})
            res.json("SUCCESS");
        });
    });
});

module.exports = router;