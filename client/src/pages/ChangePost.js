import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function ChangePost() {
    const { authState } = useContext(AuthContext);
    let { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState([]);
    const [postObject, setPostObject] = useState({});

    useEffect(() => {
        // Récupère les détails de la publication par son ID à l'aide d'une requête GET
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
            console.log(postObject.title);
        });
    }, []);

    useEffect(() => {
        // Vérifie si l'utilisateur est authentifié en vérifiant la présence du jeton d'accès dans le stockage local
        // Si non, redirige l'utilisateur vers la page d'accueil
        if (!localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

    const initialValues = {
        title: `${postObject.title}`,
        postText: `${postObject.postText}`,
        image: null,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Vous devez mettre un titre"),
        postText: Yup.string().required("Vous devez mettre une description"),
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "c1e0qh7j");

        axios.post('https://api.cloudinary.com/v1_1/prophessy/image/upload', formData).then((response) => {
            const fileName = response.data.public_id;
            let newTitle = data.title;
            // Met à jour le titre de la publication en envoyant une requête PUT
            axios.put(`http://localhost:3001/posts/title`, { newTitle: newTitle, id: id }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });
            setPostObject({ ...postObject, title: newTitle });

            let newPostText = data.postText;
            // Met à jour le contenu de la publication en envoyant une requête PUT
            axios.put(`http://localhost:3001/posts/postText`, { newText: newPostText, id: id }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });
            setPostObject({ ...postObject, postText: newPostText });

            let newImage = fileName;
            // Met à jour l'image de la publication en envoyant une requête PUT
            axios.put(`http://localhost:3001/posts/image`, { newImage: newImage, id: id }, {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            });
            setPostObject({ ...postObject, image: newImage });

            navigate('/');
        });
    };

    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize="true">
                <Form className='formContainer'>
                    <label>Titre: </label>
                    <ErrorMessage name='title' component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="Titre.." />
                    <label>Image: </label>
                    <input name="image" type="file" onChange={(e) => setImage(e.target.files)} />
                    <label>Post: </label>
                    <ErrorMessage name='postText' component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="Description.." />
                    <button type='submit'>Envoyer</button>
                </Form>
            </Formik>
        </div>
    );
}

export default ChangePost;
