import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {

    // Hook de navigation pour rediriger après l'inscription
    const navigate = useNavigate();

    // Valeurs initiales du formulaire d'inscription
    const initialValues = {
        username: "",
        password: "", 
    };

    // Schéma de validation avec Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Vous devez mettre un pseudonyme"),
        password: Yup.string().min(4).max(20).required("Vous devez mettre un mot de passe"),
    });

    // Fonction de soumission du formulaire
    const onSubmit = (data) => {
        // Envoie une requête POST pour l'inscription
        axios.post("http://localhost:3001/auth", data).then(() => {
            // Redirige vers la page d'accueil après l'inscription réussie
            navigate('/');
        });
    };


  return (
    <div>
        {/* Utilisation de Formik pour gérer le formulaire */}
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Username: </label>
                {/* Affiche le message d'erreur si la validation échoue */}
                <ErrorMessage name='username' component="span"/>
                {/* Champ de saisie pour le nom d'utilisateur */}
                <Field id="inputCreatePost" name="username" placeholder="Username.."/>
                <label>Password: </label>
                {/* Affiche le message d'erreur si la validation échoue */}
                <ErrorMessage name='password' component="span"/>
                {/* Champ de saisie pour le mot de passe */}
                <Field id="inputCreatePost" type="password" name="password" placeholder="Password.."/>
                <button type='submit'>S'inscrire</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration;
