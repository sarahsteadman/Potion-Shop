const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://potion-shop-u0ml.onrender.com/account/profile'
},
    function (accessToken, refreshToken, profile, cb) {
        console.log('GitHub profile:', profile);
        return cb(null, profile);
    }));

// Serialize and deserialize user (for session handling)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport