import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext'
import { Image } from 'cloudinary-react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Post() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);

    useEffect(() => {
         axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
          setPostObject(response.data);
        });

         axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        });
      }, []);

    const addComment = () => {
      axios.post("http://localhost:3001/comments", { commentBody: newComment, PostId: id},
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
      ).then((response) => { 
        if(response.data.error) {
          alert("Il faut être connecté pour commenter");
        }
        else {
          const commentToAdd = { commentBody: newComment, username: response.data.username };
          setComments([...comments, commentToAdd]);
          setNewComment("");
          axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        });
        }
      });
    };

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/comments/${id}`, {headers: {accessToken: localStorage.getItem('accessToken')},
    }).then(() => {
      setComments(comments.filter((val) => {
        return val.id != id;
      }))
      console.log(authState);
    });
    };

    const deletePost = (id) => {
      axios.delete(`http://localhost:3001/posts/${id}`, {headers: {accessToken: localStorage.getItem('accessToken')}});
      navigate('/');
    }

  return (
    <div>
        <div className='postPage'>
          <div className='leftSide'>
            <div className='post' id='individual'>
              <div className='title'>{postObject.title}</div>
              <div className='body'>{postObject.postText}</div>
              <div className='image'><Image cloudName="prophessy" publicId={postObject.image}/></div>
              <div className='footer'>{postObject.username} {(authState.username === postObject.username) && (<div><DeleteIcon onClick={() => {deletePost(postObject.id)}} /> <EditIcon onClick={() => {navigate(`/changepost/${id}`)}} /></div>) || (authState.username === "Admin") && (<div><DeleteIcon onClick={() => {deletePost(postObject.id)}} /> <EditIcon onClick={() => {navigate(`/changepost/${id}`)}} /></div>)} </div>
            </div>
          </div>
          <div className='rightSide'>
            <div className='addCommentContainer'>
              <input type='text' value={newComment} placeholder='Commentaire...' onChange={(event) => {setNewComment(event.target.value)}}/>
              <button onClick={addComment}> Ajouter commentaire </button>
            </div>
            <div className='listOfComments'>
              {comments.map((comment, key) => {
                return (
                <div className='comment' key={key}> { comment.commentBody } 
                  <label><br></br><br></br>Auteur: {comment.username}</label>
                  &nbsp;{authState.username === comment.username && (<DeleteIcon onClick={() => {deleteComment(comment.id)}} />)  || authState.username === "Admin" && (<DeleteIcon onClick={() => {deleteComment(comment.id)}} />)}
                </div>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post