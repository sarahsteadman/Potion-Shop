const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const potionsController = require('../controllers/potions');
const validations = require('../validation');

router.get('/potions', potionsController.getAll);
router.post('/potions', validations.potionValidationRules(), potionsController.create);

router.get('/potions:id', validations.idValidationRule(), potionsController.getSingle);
router.put('/potions:id', validations.potionValidationRules(), potionsController.update);
router.delete('/potions:id', validations.idValidationRule(), potionsController.del);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;