const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const validations = require('../validation');

router.get('/', recipesController.getAll);
router.post('/', validations.potionValidationRules(), recipesController.create);

router.get('/:id', validations.idValidationRule(), recipesController.getSingle);
router.put('/:id', validations.potionValidationRules(), recipesController.update);
router.delete('/:id', validations.idValidationRule(), recipesController.del);

module.exports = router;
