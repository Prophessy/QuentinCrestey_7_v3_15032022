import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
    // On récupère le contexte d'authentification
    const { setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Vous devez mettre un pseudonyme"),
        password: Yup.string().min(4).max(20).required("Vous devez mettre un mot de passe"),
    });

    const onSubmit = (data) => {
        // Envoie de la requête de connexion avec les données saisies
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                // Si la réponse contient une erreur, affiche l'erreur
                alert(response.data.error);
            } else {
                // Si la connexion est réussie, sauvegarde le jeton d'accès dans le stockage local
                localStorage.setItem("accessToken", response.data.token);
                // Met à jour l'état de l'authentification dans le contexte
                setAuthState({ username: response.data.username, id: response.data.id, status: true });
                // Redirige l'utilisateur vers la page d'accueil
                navigate('/');
            }
        });
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Username: </label>
                    <ErrorMessage name='username' component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="Username.." />
                    <label>Password: </label>
                    <ErrorMessage name='password' component="span" />
                    <Field id="inputCreatePost" type="password" name="password" placeholder="Password.." />
                    <button type='submit'>Se connecter</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;
