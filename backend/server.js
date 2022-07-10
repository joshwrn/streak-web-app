const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const port = 4000;
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/streaks', require('./routes/streakRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`server started on ${port}`.blue));
