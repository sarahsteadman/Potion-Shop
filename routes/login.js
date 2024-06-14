const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/', loginController.githubAuth);

module.exports = router