import express from "express";
import { getPosts, getPost, addPost, deletePost, updatePost, getPostsByUid } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

router.get("/allposts/:uid", getPostsByUid);


export default router;