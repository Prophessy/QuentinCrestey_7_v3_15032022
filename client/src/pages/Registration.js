import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {

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
        axios.post("http://localhost:3001/auth", data).then(() => {
            navigate('/');
        });
    };


  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Username: </label>
                <ErrorMessage name='username' component="span"/>
                <Field id="inputCreatePost" name="username" placeholder="Username.."/>
                <label>Password: </label>
                <ErrorMessage name='password' component="span"/>
                <Field id="inputCreatePost" type="password" name="password" placeholder="Password.."/>
                <button type='submit'>S'inscrire</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration