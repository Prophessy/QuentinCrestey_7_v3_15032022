module.exports = (sequelize, DataTypes) => {
    // Définition du modèle Posts
    const Posts = sequelize.define("Posts", {
        // Champ title représentant le titre de l'article
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Champ image représentant l'image associée à l'article
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Champ postText représentant le contenu textuel de l'article
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Champ username représentant le nom d'utilisateur associé à l'article
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Définition des associations avec d'autres modèles
    Posts.associate = (models) => {
        // Un article (post) peut avoir plusieurs commentaires (hasMany)
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", // Supprime les commentaires associés si l'article est supprimé
        });

        // Un article (post) peut avoir plusieurs likes (hasMany)
        Posts.hasMany(models.Likes, {
            onDelete: "cascade", // Supprime les likes associés si l'article est supprimé
        });
    };

    // Retourne le modèle Posts
    return Posts;
};
