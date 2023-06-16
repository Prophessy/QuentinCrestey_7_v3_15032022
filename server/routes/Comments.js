// Importation des dépendances nécessaires
const express = require("express");
const router = express.Router();

// Importation du modèle Comments à partir du dossier models
const { Comments } = require("../models");

// Importation du middleware validateToken pour la validation du token d'authentification
const { validateToken } = require("../middlewares/AuthMiddleware");

// Route pour obtenir tous les commentaires liés à une publication spécifique
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  // Recherche de tous les commentaires dans la base de données liés à la publication donnée
  const comments = await Comments.findAll({ where: { PostId: postId } });

  // Réponse JSON contenant tous les commentaires trouvés
  res.json(comments);
});

// Route pour créer un nouveau commentaire
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;

  // Ajout du nom d'utilisateur actuellement authentifié au commentaire
  comment.username = username;

  // Création du commentaire dans la base de données
  await Comments.create(comment);

  // Réponse JSON contenant le commentaire créé
  res.json(comment);
});

// Route pour supprimer un commentaire en fonction de son identifiant
router.delete('/:commentId', validateToken, async (req,res) => {
  const commentId = req.params.commentId;

  // Suppression du commentaire de la base de données en fonction de son identifiant
  await Comments.destroy({where: {
    id: commentId,
  }});

  // Réponse JSON indiquant que le commentaire a été supprimé avec succès
  res.json("DELETED SUCCESSFULLY")
});

// Exportation du routeur
module.exports = router;
