//Logique router
//On appelle express car celui ci a déjà un système de router implémenté dans le framework

const express = require('express');
const router = express.Router();

//On récupérer une instance du models  posts 

const { Posts, Likes } = require("../models");


const { validateToken } = require('../middlewares/AuthMiddleware');

//Récupérer les informations de notre database

router.get('/', validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({include: [Likes]});

    const likedPosts = await Likes.findAll({where: { UserId: req.user.id }});
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post);
});

//Insérer des informations dans notre database
//On fait une requête post à notre route post, ensuite on récupère les post data du body qui est envoyé dans la requête, ensuite on appelle la fonction sequalize create qui va insérer les données dans notre base mysql et pour finir on renvoi en tant que réponse les mêmes data qu'on a envoyé pour avoir une confirmation visuelle

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });
});

module.exports = router;