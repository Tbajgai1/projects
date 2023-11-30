import { db } from "../db.js";
import jwt from "jsonwebtoken";


export const postLike = (req, res) => { 
    const token = req.cookies.access_token;

    if(!token) return res.status(401).json("No authorized");

    jwt.verify(token, "jwtkey", (err, userInfo) => {

        if(err) return res.status(403).json("Token is invalid");
        
        const checkQuery = "SELECT COUNT(*) AS count FROM likes WHERE userLikeId = ? AND postLikeId = ?";

        db.query(checkQuery, [req.body.userId, req.body.postId], (checkErr, checkData) => {
        if (checkErr) {
            return res.status(500).json(checkErr);
        }

        if (checkData[0].count === 0) {
            // The row does not exist, so insert a new row
            const insertQuery = "INSERT INTO likes (`userLikeId`, `postLikeId`, `dateTime`, `username`, `liked`) VALUES (?, ?, ?, ?, ?)";
            const insertValues = [req.body.userId, req.body.postId, req.body.date, req.body.username, req.body.liked];

            db.query(insertQuery, insertValues, (insertErr, insertData) => {
            if (insertErr) {
                return res.status(500).json(insertErr);
            }
            return res.json("Successfully liked the post");
            });
        } else {
            return res.json("Already liked the post");
        }
        });
    });

}

export const getLikes = (req, res) => { 
    const q = "SELECT id, userLikeId, postLikeId, dateTime, username, liked FROM likes WHERE userLikeId = ? AND postLikeId = ?";

    const userLikeId = req.params.id; 
    const postLikeId = req.query.postId;
    
    db.query(q, [userLikeId, postLikeId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
}

export const deleteLikes = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("No authorized");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is invalid");

        const userLikeId = req.params.id; 
        const postLikeId = req.query.postId;

        const  q = "DELETE FROM likes WHERE `userLikeId` = ? and `postLikeId` = ?";

        db.query(q, [userLikeId, postLikeId], (err, data) => {
            if (err) return res.status(403).json("Error! Unauthorized!");
            return res.json("You unliked the post");
        });
    })
}



export const postComment = (req, res) => { 
    const token = req.cookies.access_token;

    if(!token) return res.status(401).json("No authorized");

    jwt.verify(token, "jwtkey", (err, userInfo) => {

        if(err) return res.status(403).json("Token is invalid");

            const q = "INSERT INTO comments (`comment`, `userId`, `postId`, `dateTime`, `username`) VALUES (?)";
            const values = [
                req.body.comment,
                req.body.userId,
                req.body.postId,
                req.body.date,
                req.body.username
            ]
    
            db.query(q, [values], (err, data) => {
                if(err) return res.status(500).json(err);
                return res.json("Comment posted successfully!");
            });
        
    });
};

export const getComments = (req, res) => {
    const columnSort = "dateTime";
    const q = `SELECT * FROM comments WHERE postId = ? ORDER BY ${columnSort} DESC`;
    
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
};

// TODO: DELETE COMMENT
export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("No authorized");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is invalid");

        const commentId = req.params.cid;
        const  q = "DELETE FROM comments WHERE `commentId` = ? and `userId` = ?";
        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete posts you created");
            return res.json("comment deleted successfully");
        });
    })
}