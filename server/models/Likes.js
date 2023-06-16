module.exports = (sequelize, DataTypes) => {
  // Définition du modèle Likes
  const Likes = sequelize.define("Likes");

  // Retourne le modèle Likes
  return Likes;
};
