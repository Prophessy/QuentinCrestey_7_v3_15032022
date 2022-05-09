// Page principale ou toute les autres pages se rejoignent. Utilisation de react router dom avec Router/Routes/Route pour créer des routes entre les pages

import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound"
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState({username: "", id: 0, status: false});

  useEffect(() => {

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

    const logout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({username: "", id: 0, status: false});
    };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
        <div className="navbar">
            <div className="links">
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
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Deconnexion</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={ <Home /> } />
            <Route path="/createpost" exact element={ <CreatePost /> } />
            <Route path="/post/:id" exact element={ <Post /> } />
            <Route path="/login" exact element={ <Login /> } />
            <Route path="/registration" exact element={ <Registration /> } />
            <Route path="*" exact element={ <PageNotFound /> } />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
