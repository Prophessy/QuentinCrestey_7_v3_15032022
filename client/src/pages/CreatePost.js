//Utilisation de formik qui est une api de création de form
//On complète formik avec yup qui permet de gérer les "regex"

import React, {useContext, useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {

    const {authState} = useContext(AuthContext);
    const navigate = useNavigate();
    const [image, setImage] = useState([]);

    const initialValues = {
        title: "",
        postText: "",
        image: null,
    };

    useEffect(() => {
        if(!localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

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
            axios.post("http://localhost:3001/posts", {title: data.title, postText: data.postText, image: fileName}, { headers: {accessToken: localStorage.getItem('accessToken')} }).then((response) => {
            navigate('/');
        });
        })
    };

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Titre: </label>
                <ErrorMessage name='title' component="span"/>
                <Field id="inputCreatePost" name="title" placeholder="Titre.."/>
                <label>Image: </label>
                <input name="image" type="file" onChange={(e) => setImage(e.target.files)} />
                <label>Post: </label>
                <ErrorMessage name='postText' component="span"/>
                <Field id="inputCreatePost" name="postText" placeholder="Description.."/>
                <button type='submit'>Envoyer</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost