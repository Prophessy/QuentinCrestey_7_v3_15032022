const { verify } = require('jsonwebtoken');

// Middleware pour valider le jeton d'accès
const validateToken = (req, res, next) => {
    // Récupère le jeton d'accès du header de la requête
    const accessToken = req.header("accessToken");

    // Si aucun jeton d'accès n'est présent, renvoie une erreur indiquant que l'utilisateur n'est pas connecté
    if (!accessToken) return res.json({
        error: "User not logged in!"
    });

    try {
        // Vérifie la validité du jeton d'accès en utilisant la clé secrète "importantsecret"
        const validToken = verify(accessToken, "importantsecret");

        // Si le jeton est valide, stocke les informations de l'utilisateur dans la requête et passe à l'étape suivante
        if (validToken) {
            req.user = validToken;
            return next();
        }
    } catch (err) {
        // En cas d'erreur lors de la validation du jeton, renvoie une réponse indiquant l'erreur
        return res.json({ error: err });
    }
};

module.exports = { validateToken };
