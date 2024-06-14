const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const validations = require('../validation');

router.get('/', recipesController.getAll);
router.post('/', validations.recipeValidationRules(), recipesController.create);

router.get('/:id', validations.idValidationRule(), recipesController.getSingle);
router.put('/:id', validations.recipeValidationRules(), recipesController.update);
router.delete('/:id', validations.idValidationRule(), recipesController.del);

module.exports = router;
