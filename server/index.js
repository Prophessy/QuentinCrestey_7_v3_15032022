//Initialisation de express qui nous permet de communiquer avec l'api 

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers

const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);

const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

//Démarrage du serveur avec un console.log pour confirmer que le serveur fonctionne
//Utilisation de sequelize pour écrire les données dans mysql

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Le serveur est en route");
});
});