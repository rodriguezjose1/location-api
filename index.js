const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const router = require('./src/routes/router');

const app = express();
const port = 3000;

dotenv.config('./env');

mongoose.connect(process.env.MONGO_URI, {
    autoIndex: false,
    connectTimeoutMS: 5000
});

mongoose.connection.on('connected', () => {
    console.log('Database is conected');
});

mongoose.set('debug', true);

app.use((req, res, next) => {
    console.log(`[${new Date()}] - ${req.method} - ${req.path}`);
    next();
})

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`Location api listening on port ${port}`)
});