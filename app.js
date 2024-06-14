const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT || 9000;
const app = express();
const passport = require('./authentication/passport')
require('dotenv').config();

// Initialize session
app.use(session({ secret: process.env.CLIENT_SECRET, resave: false, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// THERE IS NO FAVICON
app.get('/favicon.ico', (req, res) => {
    res.status(404).end();
});

// Use CORS Middleware
app.use(cors({
    origin: '*', // Allow all origins, adjust this if you need more specific control
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Parse JSON request bodies
app.use(bodyParser.json());

// Mount routes
app.use('/', require('./routes'));

// Initialize Database and confirm connection
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB and listening on ${port}`);
    }
});