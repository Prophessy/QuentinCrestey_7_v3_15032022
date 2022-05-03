//On récupère les informations stocké dans la database (titre, postText, username), on créer un array contenant la length du nombre de "post", puis pour chaque post dans la database on va créer une div contenant les informations.


import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
        { listOfPosts.map((value, key) => {
        return <div className='post'  key={key} onClick={() => {navigate(`/post/${value.id}`)}}>
          <div className='title'> { value.title } </div>
          <div className='body'> { value.postText } </div>
          <div className='footer'> { value.username } </div>
        </div>;
      }) }
    </div>
  )
}

export default Home