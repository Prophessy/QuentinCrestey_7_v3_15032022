// Page principale ou toute les autres pages se rejoignent. Utilisation de react router dom avec Router/Routes/Route pour créer des routes entre les pages

import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState({user: "", id: 0, status: false});

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem('acessToken'),
    } }).then((reponse) => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } 
      else {
        setAuthState({user: response.data.username, id: response.data.id, status: true});
      }
    });
  }, []);

    const logout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({user: "", id: 0, status: false});
    };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to="/createpost">Créer un post</Link>
            <Link to="/">Page d'accueil</Link>
            {!authState.status ? (
              <>
              <Link to="/login">Se connecter</Link>
              <Link to="/registration">Créer un compte</Link>
              </>
            ) : (
              <button onClick={logout}> Logout </button>
            )}


          </div>
          <Routes>
            <Route path="/" exact element={ <Home /> } />
            <Route path="/createpost" exact element={ <CreatePost /> } />
            <Route path="/post/:id" exact element={ <Post /> } />
            <Route path="/login" exact element={ <Login /> } />
            <Route path="/registration" exact element={ <Registration /> } />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
