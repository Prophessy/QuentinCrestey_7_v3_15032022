// Page principale ou toute les autres pages se rejoignent. Utilisation de react router dom avec Router/Routes/Route pour créer des routes entre les pages

import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to="/createpost">Créer un post</Link>
          <Link to="/">Page d'accueil</Link>
          <Link to="/login">Se connecter</Link>
          <Link to="/registration">Créer un compte</Link>
        </div>
        <Routes>
          <Route path="/" exact element={ <Home /> } />
          <Route path="/createpost" exact element={ <CreatePost /> } />
          <Route path="/post/:id" exact element={ <Post /> } />
          <Route path="/login" exact element={ <Login /> } />
          <Route path="/registration" exact element={ <Registration /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
