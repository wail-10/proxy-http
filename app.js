const express = require('express');
const { createClient } = require('redis')
const axios = require('axios')

const app = express()

const client = createClient()
client.on('error', err => console.log('Redis Client Error', err));

const baseUrl = "https://jsonplaceholder.typicode.com/"
// const baseUrl = "http://localhost:3001/"
app.use(express.json())
app.use(express.static('static'))

app.use(async (req, res) => {
    try {
        const key = baseUrl + req.originalUrl;

        // Check if the key exists in Redis
        client.get(key, async (err, reply) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error checking Redis for data');
            return;
        }

        if (reply) {
            const data = JSON.parse(reply);
            res.send(data);
        } else {
            const response = await axios.get(baseUrl + req.originalUrl);
            const data = response.data;

            client.setex(key, 3600, JSON.stringify(data), (err, reply) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error storing data in Redis');
            } else {
                console.log(`Data for ${key} stored in Redis with expiration`);
                res.send(data);
            }
            });
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from JSONPlaceholder');
    }
});

app.listen(3000)