module.exports = (sequelize, DataTypes) => {
    // Définition du modèle Users
    const Users = sequelize.define("Users", {
        // Champ username représentant le nom d'utilisateur
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Champ password représentant le mot de passe
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Définition des associations avec d'autres modèles
    Users.associate = (models) => {
        // Un utilisateur peut avoir plusieurs likes (hasMany)
        Users.hasMany(models.Likes, {
            onDelete: "cascade", // Supprime les likes associés si l'utilisateur est supprimé
        });

        // Un utilisateur peut avoir plusieurs articles (hasMany)
        Users.hasMany(models.Posts, {
            onDelete: "cascade", // Supprime les articles associés si l'utilisateur est supprimé
        });
    };

    // Retourne le modèle Users
    return Users;
};
