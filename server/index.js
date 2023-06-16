// Importation des dépendances nécessaires
const express = require('express');
const app = express();
const cors = require('cors');

// Utilisation du middleware pour traiter les données JSON et permettre l'accès CORS
app.use(express.json());
app.use(cors());

// Importation des modèles de base de données
const db = require('./models');

// Importation et utilisation du routeur pour les publications
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

// Importation et utilisation du routeur pour les commentaires
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);

// Importation et utilisation du routeur pour les utilisateurs (authentification)
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

// Importation et utilisation du routeur pour les likes
const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

// Synchronisation avec la base de données et démarrage du serveur
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Le serveur est en route");
    });
});
