const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/', loginController.githubAuth);
router.get('/profile', loginController.getProfile);
router.get('/logout', loginController.logout);
router.get('/loggedOut', loginController.loggedOut);

module.exports = router