//Création du middleware d'authentification qui va vérifier le token avant une requete post pour empêcher les personnes non connectés de commenter ou autre

//Verify est une fonctionnalité de json web token pour vérifier si le token est correct

const {verify} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({
        error: "User not logged in!"
    });

    try {
        const validToken = verify(accessToken, "importantsecret");
        req.user = validToken;
        
        if (validToken) {
            return next();
        }
    }
    catch (err) {
        return res.json({ error: err });
    }
};

module.exports = {validateToken};