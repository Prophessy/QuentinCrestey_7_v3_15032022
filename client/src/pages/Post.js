import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext'


function Post() {
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
        }
      });
    };

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3001/comments/${id}`, {headers: {accessToken: localStorage.getItem('accessToken')},
    }).then(() => {
      setComments(comments.filter((val) => {
        return val.id != id;
      }))
    });
    };

  return (
    <div>
        <div className='postPage'>
          <div className='leftSide'>
            <div className='post' id='individual'>
              <div className='title'>{postObject.title}</div>
              <div className='body'>{postObject.postText}</div>
              <div className='footer'>{postObject.username}</div>
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
                  <label>Username: {comment.username}</label>
                  {authState.username === comment.username && <button onClick={() => {deleteComment(comment.id)}}> Supprimer </button>}
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