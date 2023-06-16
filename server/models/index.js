'use strict';

// Importation des modules nécessaires
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Récupération du nom de fichier actuel (index.js)
const basename = path.basename(__filename);

// Récupération de l'environnement d'exécution (développement par défaut)
const env = process.env.NODE_ENV || 'development';

// Importation de la configuration de la base de données à partir du fichier config.json
const config = require(__dirname + '/../config/config.json')[env];

// Création d'un objet vide pour stocker les modèles de base de données
const db = {};

// Initialisation de Sequelize avec les informations de connexion
let sequelize;
if (config.use_env_variable) {
  // Utilisation d'une variable d'environnement pour la connexion à la base de données
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Utilisation des informations de configuration pour la connexion à la base de données
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lecture des fichiers du répertoire actuel
fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filtre pour ne prendre en compte que les fichiers de modèle JavaScript
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // Importation du modèle et ajout à l'objet db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Association des modèles s'il y a des associations définies
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Ajout des instances Sequelize et Sequelize à l'objet db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportation de l'objet db contenant les modèles et les instances Sequelize
module.exports = db;
