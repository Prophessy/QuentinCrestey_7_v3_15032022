import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext';
import { Image } from 'cloudinary-react';

function Home() {
    // État local pour stocker la liste des publications et des publications aimées
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifie si le jeton d'accès est présent dans le stockage local
        // Si non, redirige l'utilisateur vers la page de connexion
        if (!localStorage.getItem('accessToken')) {
            navigate('/login');
        } else {
            // Effectue une requête GET pour récupérer les publications avec le jeton d'accès
            axios.get("http://localhost:3001/posts", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                // Met à jour les états locaux avec les données de réponse
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId }));
            });
        }
    }, []);

    // Fonction pour aimer une publication
    const likeAPost = (postId) => {
        // Envoie une requête POST pour aimer ou désaimer une publication avec le jeton d'accès
        axios.post("http://localhost:3001/likes", { PostId: postId }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            // Met à jour la liste des publications et des publications aimées après la réponse
            setListOfPosts(listOfPosts.map((post) => {
                if (post.id === postId) {
                    if (response.data.liked) {
                        return { ...post, Likes: [...post.Likes, 0] };
                    } else {
                        const likesArray = post.Likes;
                        likesArray.pop();
                        return { ...post, Likes: likesArray };
                    }
                } else {
                    return post;
                }
            }));

            // Met à jour la liste des publications aimées
            if (likedPosts.includes(postId)) {
                setLikedPosts(likedPosts.filter((id) => { return id != postId }));
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    };

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className='post' key={key}>
                        <div className='title'> {value.title} </div>
                        <div className='body' onClick={() => { navigate(`/post/${value.id}`) }}> {value.postText} </div>
                        <div className='image' onClick={() => { navigate(`/post/${value.id}`) }}> <Image cloudName="prophessy" publicId={value.image} /> </div>
                        <div className='footer'>
                            <div className='username'><Link to={`/profile/${value.UserId}`}>{value.username} - Accéder au profil</Link></div>
                            <div className='buttons'><ThumbUpAltIcon onClick={() => { likeAPost(value.id) }} className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"} /><label> {value.Likes.length} </label></div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Home;
