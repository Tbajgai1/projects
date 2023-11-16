import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './menu.css';


export default function Menu({cat, postId}) {
  
  const [posts, setPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState({});
  
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/?cat=${cat}`);
        const filteredPosts = res.data.filter(post => post.id !== postId);
        setPosts(filteredPosts);

        const randomPosts = await axios.get(`/posts`);

        const randomId = Math.floor(Math.random() * randomPosts.data.length);
        setRandomPosts(randomPosts.data[randomId]);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [cat, postId]);
  
  return (
  

    <div className='menu'>
        {
          posts && posts.length > 0 ? (
            <>
              <h2>Similar Posts </h2>
              {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={`/upload/${post.img}`} alt="post.img" />
                    <Link to={`/post/${post.id}`} className= "link">
                      <h3>{post.title}</h3>
                    </Link>

                </div>
            ))}
            </>
          ): (
            <>
              {randomPosts && randomPosts.img && (
                <>
                  <h2>Other Posts</h2>
                  <div className="post" key={randomPosts.id}>
                    <img src={`/upload/${randomPosts.img}`} alt="randompost" />
                    <Link to={`/post/${randomPosts.id}`} className= "link" >
                      <h3>{randomPosts.title}</h3>
                    </Link>

                  </div>
                </>
              )}
            </>
          )}
        
    </div>
  )
}
