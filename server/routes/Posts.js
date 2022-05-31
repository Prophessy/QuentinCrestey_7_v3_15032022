//Logique router
//On appelle express car celui ci a déjà un système de router implémenté dans le framework

const express = require('express');
const router = express.Router();

//Multer

const multer = require('../middlewares/multer-config');

//On récupérer une instance du models  posts 

const { Posts, Likes } = require("../models");


const { validateToken } = require('../middlewares/AuthMiddleware');

//Récupérer les informations de notre database

router.get('/', validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({include: [Likes], order: [["createdAt", "DESC"]]});

    const likedPosts = await Likes.findAll({where: { UserId: req.user.id }});
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.get('/byUserId/:id', async (req,res) => {
    const id = req.params.id
    const listOfPosts = await Posts.findAll({where: {UserId: id}, include: [Likes],});
    res.json(listOfPosts);
});

//Insérer des informations dans notre database
//On fait une requête post à notre route post, ensuite on récupère les post data du body qui est envoyé dans la requête, ensuite on appelle la fonction sequalize create qui va insérer les données dans notre base mysql et pour finir on renvoi en tant que réponse les mêmes data qu'on a envoyé pour avoir une confirmation visuelle

router.post("/", validateToken, multer, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
    console.log(post);
});

router.put("/title", validateToken, async (req, res) => {
    const {newTitle, id} = req.body;
    await Posts.update({title: newTitle}, {where: {id: id}})
    res.json(newTitle);
});

router.put("/postText", validateToken, async (req, res) => {
    const {newText, id} = req.body;
    await Posts.update({postText: newText}, {where: {id: id}})
    res.json(newText);
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