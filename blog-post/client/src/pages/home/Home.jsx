import './home.css';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegComments } from 'react-icons/fa';
import { CgMore } from 'react-icons/cg';
import FormattedContent from '../../components/FormatText';




function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat = searchParams.get('cat');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat ? `?cat=${cat}` : ''}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="container">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.img}`} alt={post.img} />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <div className='descriptionP'>
                  <FormattedContent htmlContent ={post.desc}/>
                  <span>
                    <Link to={`post/${post.id}`} className="readMore">
                      more <CgMore className='moreIcon'/>
                    </Link>

                  </span>
                </div>

                <div className='postInfo'>
                  {
                    post.likes && post.likes ? (
                      <span className='likes'>
                        <BiLike className='iconC'/> {post.likes} 
                      </span> 
                    ): <span className='likes'>
                        <BiLike className='iconC'/> {post.likes} 
                      </span> 
                  }
                  {
                    post.comments && post.comments ? (
                      <span className='comments'>
                        <Link to={`/post/${post.id}`} className="commentLink">
                          <FaRegComments className='iconC'/> {post.comments} 
                        </Link>
                      </span> 
                    ): ""
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;