import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userRef: {
        type: String,
        required: true,
    },
    createdBy: {
    type: String,
    },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;