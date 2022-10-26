require('dotenv').config();

// imports
const express = require('express');
const { MongoClient } = require('mongodb');

// express app
const app = express();

// middlewares
app.use(express.json());

app.use('/', (req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(process.env.PORT, () => {
    console.log('server is running');
});