import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function PostsLists({posts}) {

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }
  return (
    <div className="postWrapper">
        
        {  posts && posts.length > 0 ? (
            <div className="userWrapper">
                <div className="profInfo">
                    <Link to={`/posts/${posts[0].uid}`} className="profImg">
                        {posts[0].profImg ? (
                            <img src={`../../profImg/${posts[0].profImg}`} alt="Profile" />
                        ): (
                            <FaUserCircle className="profAvatar"/>
                        )}
                    </Link>
                    <p className="userName">
                        {posts[0].uname}
                        <span>
                            {posts.length} Posts

                        </span>
                    </p>             
                </div>
            </div>

        ): "" }
       
      {posts.map((post, index) => (
        <div key={index} className="postItem">
          <div className="img">
            <img src={`../../upload/${post.img}`} alt="Post" />
          </div>
          <div className="textContent">
            <Link to={`/post/${post.id}`} className= "link">
                <h3>{post.title}</h3>
            </Link>
            <p>{getText(post.desc)}</p>
            <div className="likesComments">
                <p>
                    {post.likes} Likes
                </p>
                ||
                <p>
                    {post.comments} Comments
                </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostsLists;