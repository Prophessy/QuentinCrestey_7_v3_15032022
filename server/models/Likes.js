//Création des données likes avec sequilize

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");
  
    return Likes;
  };