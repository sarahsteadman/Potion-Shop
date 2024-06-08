const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const potionsRoutes = require('./potions');
const recipesRoutes = require('./recipes');

router.use('/potions', potionsRoutes);
router.use('/recipes', recipesRoutes);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
