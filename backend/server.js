require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/songs');

const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());


console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to database');
            console.log('Listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });

// API routes
app.use('/api/songs', routes);
