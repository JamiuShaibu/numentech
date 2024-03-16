import {createPost, deletePost, updatePost, getPost, getPosts} from "../controllers/postController.js";
import express from "express";
import { verifyUserToken } from "../utils/verifyUser.js";


const postRouter = express.Router();


postRouter.post("/create", verifyUserToken, createPost)
postRouter.delete('/delete/:id', verifyUserToken, deletePost);
postRouter.post("/update/:id", verifyUserToken, updatePost);
postRouter.get("/get/:id", getPost);
postRouter.get("/get", getPosts);


export default postRouter;