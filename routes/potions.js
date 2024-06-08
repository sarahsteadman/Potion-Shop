const express = require('express');
const router = express.Router();
const potionsController = require('../controllers/potions');
const validations = require('../validation');

router.get('/', potionsController.getAll);
router.post('/', validations.potionValidationRules(), potionsController.create);

router.get('/:id', validations.idValidationRule(), potionsController.getSingle);
router.put('/:id', validations.potionValidationRules(), potionsController.update);
router.delete('/:id', validations.idValidationRule(), potionsController.del);

module.exports = router;
