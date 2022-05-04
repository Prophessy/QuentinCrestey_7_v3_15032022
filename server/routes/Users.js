//Logique router
//On appelle express car celui ci a déjà un système de router implémenté dans le framework

const express = require('express');
const router = express.Router();

//On appelle bcrypt pour le hashage des mots de passes

const bcrypt = require('bcrypt');

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

        res.json("Tu es connecté")
    });
});

module.exports = router;