// Importation des dépendances nécessaires
const express = require('express');
const router = express.Router();

// Importation du modèle Likes à partir du dossier models
const { Likes } = require("../models");

// Importation du middleware validateToken pour la validation du token d'authentification
const { validateToken } = require('../middlewares/AuthMiddleware');

// Route pour gérer les likes des publications
router.post("/", validateToken, async(req, res) => {
    const {PostId} = req.body;
    const UserId = req.user.id;

    // Recherche d'un like existant pour la publication donnée et l'utilisateur actuellement authentifié
    const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });

    // Vérification si un like existe déjà pour la publication et l'utilisateur
    if (!found) {
        // Création d'un nouveau like dans la base de données avec la publication et l'utilisateur donnés
        await Likes.create({PostId: PostId, UserId: UserId});
        
        // Réponse JSON indiquant que la publication a été aimée (liked: true)
        res.json({liked: true});
    }
    else {
        // Suppression du like existant dans la base de données pour la publication et l'utilisateur donnés
        await Likes.destroy({
            where: {
                PostId: PostId, UserId: UserId 
            }
        });
        
        // Réponse JSON indiquant que le like a été annulé (liked: false)
        res.json({ liked: false });
    }
});

// Exportation du routeur
module.exports = router;
