import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound"
import Profile from "./pages/Profile"
import ChangePassword from "./pages/ChangePassword"
import ChangePost from "./pages/ChangePost"
import Logo from "./logo/icon-left-font-monochrome-white.png"
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // État pour gérer l'authentification de l'utilisateur
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});

  useEffect(() => {
    // Effectue une requête GET pour vérifier l'authentification de l'utilisateur
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem('accessToken'),
    } }).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } 
      else {
        setAuthState({username: response.data.username, id: response.data.id, status: true});
      }
    });
  }, []);

  // Fonction de déconnexion de l'utilisateur
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  };

  return (
    <div className="App">
      {/* Fournit le contexte d'authentification aux composants enfants */}
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <div className="links">
              {/* Affiche les liens de navigation en fonction de l'état d'authentification */}
              {!authState.status ? (
                <>
                  <Link to="/login"> Connexion</Link>
                  <Link to="/registration"> S'inscrire</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Page d'accueil</Link>
                  <Link to="/createpost"> Créer un post</Link>
                </>
              )}
            </div>
            <img src={Logo} alt="Logo"/>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {/* Affiche le bouton de déconnexion si l'utilisateur est connecté */}
              {authState.status && <button onClick={logout}> Deconnexion</button>}
            </div>
          </div>
          <Routes>
            {/* Définit les routes de l'application avec leurs composants correspondants */}
            <Route path="/" exact element={ <Home /> } />
            <Route path="/createpost" exact element={ <CreatePost /> } />
            <Route path="/post/:id" exact element={ <Post /> } />
            <Route path="/changepost/:id" exact element={ <ChangePost /> } />
            <Route path="/login" exact element={ <Login /> } />
            <Route path="/registration" exact element={ <Registration /> } />
            <Route path="/profile/:id" exact element={ <Profile /> } />
            <Route path="/changepassword" exact element={ <ChangePassword /> } />
            <Route path="*" exact element={ <PageNotFound /> } />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
