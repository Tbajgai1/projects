import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaUserCircle, FaHeart, FaComments } from "react-icons/fa"
import { BiSolidCommentDetail } from "react-icons/bi";
import ReactQuill from 'react-quill';

import axios from "axios";
import moment from "moment";

import './single.css';
import Menu from '../../components/menu/Menu';
import { AuthContext } from "../../context/authContext";
import FormattedContent from "../../components/FormatText";


function Single() {
  const [post, setPost] = useState({});  
  const [like, setLike] = useState('0');
  const [checkLike, setCheckLike] = useState(0);
  const [value, setValue] = useState('');
  const [openComment, setOpenComment] = useState(false);
  const [getComments, setGetComments] = useState([]);
  const [showAllComment, setShowAllComments] = useState(false);

  const [errMsg, setErrMsg] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];
  
  const userId = currentUser ? currentUser.id : null;
  


  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        

        const resLike = await axios.get(`/commentlikes/likes/${userId}?postId=${postId}`);
        setCheckLike(resLike.data);

        const resComment = await axios.get(`/commentlikes/comments/${postId}`);
        setGetComments(resComment.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [like, value, post, postId, userId, checkLike]);

  const handleClick = async (e) => {
    e.preventDefault();
  
    if (currentUser) {
      if (!checkLike || checkLike.length === 0) {
        try {
          const newAddedLike = parseInt(post.likes) + 1;
          setLike(newAddedLike);
  
          await axios.put(`/posts/${post.id}`, {
            like: newAddedLike,
            id: postId,
          });
  
          await axios.post(`/commentlikes/likes`, {
            liked: '1',
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            postId: postId,
            username: currentUser.username,
            userId: currentUser.id
          });
  
        } catch (err) {
          console.log(err);
        }
      } else if (checkLike.length === 1) {
        try {
          const newLike = parseInt(post.likes) - 1;
          setLike(newLike);
          
          await axios.put(`/posts/${post.id}`, {
            like: newLike,
            id: postId,
          });
  
          await axios.delete(`/commentlikes/likes/${currentUser.id}?postId=${post.id}`);
  
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setErrMsg(true);
      setTimeout(() => {
        setErrMsg(false);
      }, 4000);
    }
  };
  

  // comment function 
  const handleComment = async (e) => {
  e.preventDefault();
  if(currentUser) {
    setOpenComment(!openComment);
  } else {
    setErrMsg(true);
      
      setTimeout(() => {
        setErrMsg(false);
      }, 4000); 
  }
  };

  const submitComment = async (e) => {
  e.preventDefault();

  if(openComment) {
    setValue((prevValue) => prevValue + value);
    try {
      await axios.post(`/commentlikes/comments`, {
        comment: value,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        postId: postId,
        username: currentUser.username,
        userId: currentUser.id
      });

    }catch(err) {
      console.log(err);
    };
  };

  setOpenComment(!openComment);
  setValue('');

  // console.log(value);
  }; //End submitComment


  const showComments = async (e) => {
  e.preventDefault();
  setShowAllComments(!showAllComment);
  }

  const handleDeleteComments = async (commentId) => {
  try {
    await axios.delete(`/commentlikes/comments/${commentId}`);

  } catch (err) {
      console.log(err);
  };

  };

  return (
      <div className='single'>
        <div className="container">
          <div className="content">
            <div className="img">
            {post && post.img ? (
              <img src={`/upload/${post.img}`} alt="post" />
            ) : (
              <div>No Image Available</div>
            )}
            </div>
            
            <div className="likeComments">
              <FaHeart className={`heart ${checkLike && checkLike.length === 1 ? 'liked': "" }`} value={like} onClick={handleClick}/>
              <BiSolidCommentDetail className="comments" onClick={handleComment}/>
              <span className="totallikes">
              
                  {post.likes && post.likes >= 1 ? (
                    <>
                      {post.likes} Likes     
                    </>
                  ): "0 Likes" }
              </span>
              <span className="showComments" onClick={showComments}>
                {getComments.length >= 1 ? (
                  <>
                    <FaComments /> {getComments.length}
                  </>
                ) : "0 Comments"}
              </span>
            </div>
            {openComment && openComment ? (
              <>
                <div className="editorContainer">
                  <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
                <div className="button" onClick={submitComment}>Post</div>
              </>
            ) : ""}

              <div className={`commentsDiv ${showAllComment && showAllComment ? ('show') : ""}`}>
                  {getComments.map((comment, key) => (
                    <div key={key} className="commentsShow">
                      
                      <div className="commentText">
                        <p>
                          {comment?.comment}
                        </p> 

                        {/* Show delete BTN */}
                          {currentUser !== null && post !== null && post.username !== null && currentUser.id === comment?.userId && (
                             
                            <div key={key} className="delete link">
                              < MdDelete onClick={() => handleDeleteComments(comment.commentId)}/>
                            </div>
                        )}
                      </div>
                      <div className="name"> 
                        <p>
                          {comment?.username}  
                        </p>
                        ||
                        <p className="date">
                          {moment(comment?.dateTime).fromNow()} 
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            {errMsg && errMsg ? (
              <p className="errLogged">Must be logged in!</p>
            ) : ""}
            {post && (
              <div className="user">
                 <Link to={`/posts/${post.uid}`}>
                  {post.userImg ? (
                    <img src={`/profImg/${post.userImg}`} alt="Profile" />
                  ): (
                    
                    <FaUserCircle className="profAvatar"/>
                  )}
                </Link>
                <div className="info">

                  <Link to={`/posts/${post.uid}`}>
                    {post && post.username && (
                        <span>{post.username}</span>
                    )}
                  </Link>
                  <p>Posted {moment(post.date).fromNow()}</p>
                  </div>
                  {currentUser !== null && post !== null && post.username !== null && currentUser.username === post.username && (
                    <div className="buttons">
                      <Link className="link edit" to={`/write?edit=${post.id}`} state={post}>
                        <FaEdit />
                      </Link>
                      <Link className="link delete" onClick={handleDelete}>
                        <MdDelete />
                      </Link>
                    </div>
                  )}

              </div>
            )}

            <div className="text-content">
              <h2>{post.title}</h2>
              <FormattedContent htmlContent = {post.desc}/>
            </div>
          </div>
          <Menu cat={post.cat} postId = {post.id}  />
        </div>
      </div>
  );
}

export default Single;