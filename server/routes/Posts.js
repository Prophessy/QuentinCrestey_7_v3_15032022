// Importation des dépendances nécessaires
const express = require('express');
const router = express.Router();

// Importation des modèles Posts et Likes à partir du dossier models
const { Posts, Likes } = require("../models");

// Importation du middleware validateToken pour la validation du token d'authentification
const { validateToken } = require('../middlewares/AuthMiddleware');

// Route pour obtenir la liste des publications avec les likes associés
router.get('/', validateToken, async (req, res) => {
    // Récupération de la liste des publications en incluant les likes, triées par ordre décroissant de création
    const listOfPosts = await Posts.findAll({include: [Likes], order: [["createdAt", "DESC"]]});

    // Récupération des publications aimées par l'utilisateur actuellement authentifié
    const likedPosts = await Likes.findAll({where: { UserId: req.user.id }});

    // Réponse JSON contenant la liste des publications et les publications aimées par l'utilisateur
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

// Route pour obtenir une publication spécifique en fonction de son identifiant
router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    // Recherche de la publication en fonction de son identifiant
    const post = await Posts.findByPk(id);

    // Réponse JSON contenant la publication trouvée
    res.json(post);
});

// Route pour obtenir la liste des publications d'un utilisateur en fonction de son identifiant
router.get('/byUserId/:id', async (req,res) => {
    const id = req.params.id;
    // Recherche des publications en fonction de l'identifiant de l'utilisateur, en incluant les likes
    const listOfPosts = await Posts.findAll({where: {UserId: id}, include: [Likes],});

    // Réponse JSON contenant la liste des publications de l'utilisateur
    res.json(listOfPosts);
});

// Route pour créer une nouvelle publication
router.post("/", validateToken, async (req, res) => {
    const post = req.body;

    // Ajout du nom d'utilisateur et de l'identifiant de l'utilisateur à la publication
    post.username = req.user.username;
    post.UserId = req.user.id;

    // Création de la publication dans la base de données
    await Posts.create(post);

    // Réponse JSON contenant la publication créée
    res.json(post);

    // Affichage de la publication dans la console
    console.log(post);
});

// Route pour mettre à jour le titre d'une publication
router.put("/title", validateToken, async (req, res) => {
    const {newTitle, id} = req.body;

    // Mise à jour du titre de la publication dans la base de données en fonction de son identifiant
    await Posts.update({title: newTitle}, {where: {id: id}});

    // Réponse JSON contenant le nouveau titre de la publication
    res.json(newTitle);
});

// Route pour mettre à jour le texte d'une publication
router.put("/postText", validateToken, async (req, res) => {
    const {newText, id} = req.body;

    // Mise à jour du texte de la publication dans la base de données en fonction de son identifiant
    await Posts.update({postText: newText}, {where: {id: id}});

    // Réponse JSON contenant le nouveau texte de la publication
    res.json(newText);
});

// Route pour mettre à jour l'image d'une publication
router.put("/image", validateToken, async (req, res) => {
    const {newImage, id} = req.body;

    // Mise à jour de l'image de la publication dans la base de données en fonction de son identifiant
    await Posts.update({image: newImage}, {where: {id: id}});

    // Réponse JSON contenant la nouvelle image de la publication
    res.json(newImage);
});

// Route pour supprimer une publication en fonction de son identifiant
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;

    // Suppression de la publication de la base de données en fonction de son identifiant
    await Posts.destroy({
        where: {
            id: postId,
        },
    });
});

// Exportation du routeur
module.exports = router;
