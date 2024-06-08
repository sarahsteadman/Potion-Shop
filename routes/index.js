const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const potionsController = require('../controllers/potions');
const recipesController = require('../controllers/recipes');
const validations = require('../validation');

router.get('/potions', potionsController.getAll);
router.post('/potions', validations.potionValidationRules(), potionsController.create);

router.get('/potions:id', validations.idValidationRule(), potionsController.getSingle);
router.put('/potions:id', validations.potionValidationRules(), potionsController.update);
router.delete('/potions:id', validations.idValidationRule(), potionsController.del);

router.get('/recipes', recipesController.getAll);
router.post('/recipes', validations.potionValidationRules(), recipesController.create);

router.get('/recipes:id', validations.idValidationRule(), recipesController.getSingle);
router.put('/recipes:id', validations.potionValidationRules(), recipesController.update);
router.delete('/recipes:id', validations.idValidationRule(), recipesController.del);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;