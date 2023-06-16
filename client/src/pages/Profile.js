import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { Image } from 'cloudinary-react';

function Profile() {

    // Obtient l'ID de l'utilisateur à partir des paramètres de l'URL
    let { id } = useParams();

    // État local pour stocker le nom d'utilisateur
    const [username, setUsername] = useState("");

    // État local pour stocker la liste des publications de l'utilisateur
    const [listOfPosts, setListOfPosts] = useState([]);

    // Hook de navigation pour rediriger l'utilisateur
    const navigate = useNavigate();

    // Contexte d'authentification pour obtenir les informations d'authentification de l'utilisateur
    const { authState } = useContext(AuthContext);

    // Effectue les appels API lors du chargement du composant
    useEffect(() => {
        // Appel API pour obtenir les informations de base de l'utilisateur
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        // Appel API pour obtenir les publications de l'utilisateur
        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1> Profile de: {username} </h1>
                {/* Affiche un bouton pour changer le mot de passe si l'utilisateur est connecté et accède à son propre profil */}
                {authState.username === username && (
                    <button onClick={() => navigate("/changepassword")}>Changer votre mot de passe</button>
                )}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return (
                        <div className='post' key={key}>
                            <div className='title'> {value.title} </div>
                            <div
                                className='body'
                                onClick={() => {
                                    navigate(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                            </div>
                            <div className='image'>
                                {/* Affiche l'image de la publication à l'aide de Cloudinary */}
                                <Image cloudName="prophessy" publicId={value.image} />
                            </div>
                            <div className='footer'>
                                <div className='username'>{value.username}</div>
                                <div className='buttons'>
                                    <label> {value.Likes.length} </label>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;
