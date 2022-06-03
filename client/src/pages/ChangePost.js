import React, {useContext, useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function ChangePost() {
    const {authState} = useContext(AuthContext);
    let { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState([]);
    const [postObject, setPostObject] = useState({});

    const initialValues = {
        title: "",
        postText: "",
        image: null,
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
         setPostObject(response.data);
       });
     }, []);

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
            let newTitle = data.title;
            axios.put(`http://localhost:3001/posts/title`, {newTitle: newTitle, id: id}, {headers: {accessToken: localStorage.getItem('accessToken')}});
            setPostObject({...postObject, title: newTitle})
            let newPostText = data.postText;
            axios.put(`http://localhost:3001/posts/postText`, {newText: newPostText, id: id}, {headers: {accessToken: localStorage.getItem('accessToken')}});
            setPostObject({...postObject, postText: newPostText})
            let newImage = fileName;
            axios.put(`http://localhost:3001/posts/image`, {newImage: newImage, id: id}, {headers: {accessToken: localStorage.getItem('accessToken')}});
            setPostObject({...postObject, image: newImage})
            navigate('/');
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

export default ChangePost