const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = 4000;
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/streaks', require('./routes/streakRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => console.log('server started'.rainbow.bold.underline));
