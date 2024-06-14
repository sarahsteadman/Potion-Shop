const passport = require('passport');

const githubAuth = passport.authenticate('github', { scope: ['read:user', 'user:email'] });

// Handles the GitHub OAuth callback
const githubAuthCallback = passport.authenticate('github', { failureRedirect: '/' });

// After successful authentication, redirect or send a response
const githubAuthSuccess = (req, res) => {
    res.redirect('/api-docs');
};

module.exports = { githubAuth, githubAuthCallback, githubAuthSuccess }