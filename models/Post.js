const mongoose = require('mongoose');

// postId: Number, // Reference to the post ID
const commentSchema = new mongoose.Schema({
    id: Number, // Comment ID
    name: String,
    email: String,
    body: String,
});

const postSchema = new mongoose.Schema({
    userId: Number, // Reference to the user ID who created the post
    id: Number, // Post ID
    title: String,
    body: String,
    comments: [commentSchema], // Array of comments associated with the post
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
