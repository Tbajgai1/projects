import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT posts.*, COALESCE(comments.comment_count, 0) AS comments FROM posts LEFT JOIN (SELECT postID, COUNT(*) AS comment_count FROM comments GROUP BY postID) AS comments ON posts.id = comments.postID";

    db.query(q, [req.query.cat], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT posts.id, posts.uid, users.username, likes, title, `desc`, cat, date, posts.img,users.img as userImg, likes.id as likesId,likes.username as likesUsername, liked, postlikeId, userLikeId FROM users JOIN posts ON users.id = posts.uid LEFT JOIN likes ON likes.postLikeId = posts.id WHERE posts.id = ? "; 
    
    db.query(q, [req.params.id], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {

    const token = req.cookies.access_token;

    if(!token) return res.status(401).json("No authorized");

    jwt.verify(token, "jwtkey", (err, userInfo) => {

        if(err) return res.status(403).json("Token is invalid");

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.json("Post has been created");
        });
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("No authorized");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is invalid");

        const postId = req.params.id;
        const  q = "DELETE FROM posts WHERE `id` = ? and `uid` = ?";
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete posts you created");
            return res.json("Post deleted successfully");
        });
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authorized");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid");

        const postId = req.params.id;

        let q;
        let values;

        if (req.body.img) {
            q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ?";
            values = [req.body.title, req.body.desc, req.body.img, req.body.cat, postId, userInfo.id];
        }else if(req.body.like) {
            q = "UPDATE posts SET `likes` = ? WHERE `id` = ?";
            values = [req.body.like, req.body.id];
        }else {
            q = "UPDATE posts SET `title` = ?, `desc` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ?";
            values = [req.body.title, req.body.desc, req.body.cat, postId, userInfo.id];
        }

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been Updated");
        });
    });
};


export const getPostsByUid = (req, res) => {
    const uid = req.params.uid;
  
    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const q = "SELECT posts.*, COALESCE(comments.comment_count, 0) AS comments, users.username as uname, users.img as profImg FROM posts LEFT JOIN (SELECT postID, COUNT(*) AS comment_count FROM comments GROUP BY postID) AS comments ON posts.id = comments.postID JOIN users ON posts.uid = users.id WHERE uid = ?";
    // const q = "SELECT * FROM posts WHERE uid = ?";
  
    db.query(q, [uid], (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      return res.status(200).json(data);
    });
  };
  