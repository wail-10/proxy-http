const express = require('express')
const db = require('./db'); 
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
// app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)


db.once('open', () => {
    app.listen(3001);
});
