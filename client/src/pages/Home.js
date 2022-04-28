//On récupère les informations stocké dans la database (titre, postText, username), on créer un array contenant la length du nombre de "post", puis pour chaque post dans la database on va créer une div contenant les informations.


import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
        { listOfPosts.map((value, key) => {
        return <div className='post'>
          <div className='title'> { value.title } </div>
          <div className='body'> { value.postText } </div>
          <div className='footer'> { value.username } </div>
        </div>;
      }) }
    </div>
  )
}

export default Home