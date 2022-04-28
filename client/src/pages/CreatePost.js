//Utilisation de formik qui est une api de création de form
//On complète formik avec yup qui permet de gérer les "regex"

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CreatePost() {

    const initialValues = {
        title: "",
        postText: "",  
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Vous devez mettre un titre"),
        postText: Yup.string().required("Vous devez mettre une description"),
        username: Yup.string().min(3).max(15).required("Vous devez mettre un pseudo"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
        console.log("it worked");
        });
    };
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Titre: </label>
                <ErrorMessage name='title' component="span"/>
                <Field id="inputCreatePost" name="title" placeholder="Titre.."/>
                <label>Post: </label>
                <ErrorMessage name='postText' component="span"/>
                <Field id="inputCreatePost" name="postText" placeholder="Description.."/>
                <label>Username: </label>
                <ErrorMessage name='username' component="span"/>
                <Field id="inputCreatePost" name="username" placeholder="Zebi"/>
                <button type='submit'>Envoyer</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost