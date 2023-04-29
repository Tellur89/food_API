const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/meals');

router.get('/', mealsController.index);
router.get('/:name', mealsController.show);
router.post('/', mealsController.create);
router.patch('/:id', mealsController.update);
router.delete('/:id', mealsController.destroy);

module.exports = router;
