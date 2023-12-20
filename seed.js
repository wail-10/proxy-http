const axios = require('axios')
const db = require('./db')
const User = require('./models/User')
const Post = require('./models/Post')

const baseUrl = 'https://jsonplaceholder.typicode.com/'

db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
         // Fetch all users
        const usersResponse = await axios.get(baseUrl + 'users');
        const users = usersResponse.data;

        // Insert users into the User collection if the collection is empty
        if (await User.countDocuments().exec() === 0) {
            await User.insertMany(users);
            console.log('Users seeded successfully');
        } else {
            console.log('Database already contains users, skipping user seeding');
        }

        // Fetch all posts
        const postsResponse = await axios.get(baseUrl + 'posts');
        const posts = postsResponse.data;

        for (const fetchedPost of posts) {
            // Fetch comments for each post
            const commentsResponse = await axios.get(`${baseUrl}comments?postId=${fetchedPost.id}`);
            const comments = commentsResponse.data;

            // Create a new Post document and associate fetched comments
            const newPost = new Post({
                userId: fetchedPost.userId,
                id: fetchedPost.id,
                title: fetchedPost.title,
                body: fetchedPost.body,
                comments: comments,
            });

            await newPost.save();
        }

        console.log('Posts seeded successfully with comments');
        // Close the connection after seeding
        db.close();
    } catch (error) {
        console.error('Error during seeding:', error.message);
        db.close();
    }
});