import Post from '../models/postModel.js';
import { errorHandler } from "../utils/error.js"


export const createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};


export const deletePost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(errorHandler(404, "Post not found"));
    }
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        next(err)
    }
}


export const updatePost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(errorHandler(404, "post not found"));
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedPost);
    } catch (err) {
        next(err);
    }
};


export const getPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
        return next(errorHandler(404, "post not found."));
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
}


export const getPosts = async (req, res, next) => {
    try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (!posts) {
        return next(errorHandler(404, "Posts not found."));
    }
    const formattedPosts = posts.map(post => ({
        ...post.toObject(), // Convert Mongoose document to plain JavaScript object
        createdAt: new Date(post.createdAt).toLocaleString() // Format createdAt field
    }));

    res.status(200).json(formattedPosts);
    } catch (err) {
    next(err);
    }
};