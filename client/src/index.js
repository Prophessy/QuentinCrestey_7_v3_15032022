import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crée une racine de rendu ReactDOM attachée à l'élément HTML avec l'ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rend l'application React dans la racine de rendu
root.render(
  // Utilise le mode strict de React pour détecter les problèmes potentiels dans le code
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Appelle la fonction reportWebVitals pour mesurer les performances de l'application
reportWebVitals();
