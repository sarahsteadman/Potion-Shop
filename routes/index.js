const express = require('express');
const router = express.Router();

const potionsController = require('../controllers/potions');

router.get('/potions', potionsController.getAll);
router.post("/potions", potionsController.create);

router.get('/potions:id', potionsController.getSingle);
router.put('/potions:id', potionsController.update);
router.delete('/potions:id', potionsController.del);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;