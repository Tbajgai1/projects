import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import './userposts.css';


import PostsLists from './PostsLists';

function Posts() {
    const [userPosts, setUserPosts] = useState([])

    const location = useLocation();
    const userId = location.pathname.split("/")[2];


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/posts/allposts/${userId}`);
            setUserPosts(res.data);
            // console.log(userId)
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [userId]);

    
      return (
        <div className="postsWrapper">
            < PostsLists posts = {userPosts}/>
        </div>
    )
}

export default Posts;