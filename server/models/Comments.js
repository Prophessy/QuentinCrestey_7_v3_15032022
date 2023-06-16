module.exports = (sequelize, DataTypes) => {
  // Définition du modèle Comments
  const Comments = sequelize.define("Comments", {
    // Champ commentBody représentant le corps du commentaire
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Champ username représentant le nom d'utilisateur associé au commentaire
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  // Retourne le modèle Comments
  return Comments;
};
