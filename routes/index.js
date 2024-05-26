const express = require('express');
const router = express.Router();

const potionsController = require('../controllers/potions');

router.get('/', potionsController.getAll);
router.post("/", potionsController.create);

router.get('/:id', potionsController.getSingle);
router.put('/:id', potionsController.update);
router.delete('/:id', potionsController.del);

module.exports = router;