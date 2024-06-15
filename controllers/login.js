const passport = require('passport');

const githubAuth = passport.authenticate('github', { scope: ['read:user', 'user:email'] });

const githubAuthCallback = passport.authenticate('github', { failureRedirect: '/' });

const githubAuthSuccess = (req, res) => {
    res.redirect('/account/profile');
};

const getProfile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Not authenticated');
    }
    res.json(req.user); // Return user profile information
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/loggedOut');
    });
};

const loggedOut = (req, res) => {
    const message = "You have logged out."
    res.status(200).json(message);
}

module.exports = { githubAuth, githubAuthCallback, githubAuthSuccess, getProfile, logout, loggedOut }