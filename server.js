require('dotenv').config();

// imports
const express = require('express');
const { Db } = require('mongodb');
const { MongoClient } = require('mongodb');

// db
let db;

// express app
const app = express();

// middlewares
app.use(express.json());

app.use('/', (req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/:sem/:dept', (req, res) => {
    const { sem, dept } = req.params;
    db.collection(sem)
        .find({dept: {$all: [dept]}})
        .toArray((err, items) => {
            res.send(items);
        });
});

// db connection
MongoClient.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    db = client.db();

    app.listen(process.env.PORT, () => {
        console.log('connected to db and server is running');
    });
})
