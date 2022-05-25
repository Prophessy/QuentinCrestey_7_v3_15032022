import React, { useState, useContext} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function Login() {

    const {setAuthState} = useContext(AuthContext);

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
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({username: response.data.username, id: response.data.id, status: true});
                navigate('/');
            }
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
                <button type='submit'>Se connecter</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Login