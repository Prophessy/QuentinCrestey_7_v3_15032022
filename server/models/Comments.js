//Création des données comments avec sequilize

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Comments;
  };