import express from "express";
import { postComment, postLike, getLikes, deleteLikes, getComments, deleteComment } from "../controllers/commentlikes.js";

const router = express.Router();

router.post("/likes", postLike);
router.get("/likes/:id", getLikes);
router.delete("/likes/:id", deleteLikes);
router.post("/comments", postComment);
router.get("/comments/:id", getComments);
router.delete("/comments/:cid", deleteComment);





export default router;