const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/', loginController.githubAuth);
app.get('/callback', loginController.githubAuthCallback, loginController.githubAuthSuccess);
router.get('/profile', loginController.getProfile);
router.get('/logout', loginController.logout);
router.get('/loggedOut', loginController.loggedOut);

module.exports = router