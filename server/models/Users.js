//Création des données users avec sequilize

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        right: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
    };

    return Users;
};