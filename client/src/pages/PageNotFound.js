import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    // Composant qui affiche la page "Page Not Found"
    return (
        <div>
            <h1>Page Not Found :/</h1>
            <h3> Try this link: <Link to="/"> Page d'accueil</Link> </h3>
        </div>
    );
}

export default PageNotFound;
