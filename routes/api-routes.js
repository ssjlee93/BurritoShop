const express = require('express');
const router = express.Router();
const BurritoController = require('../controllers/BurritoController');
const burritoController = new BurritoController();
const orderController = require('../controllers/OrderController')

router.get('/burrito', burritoController.getAllBurritos);
router.post('/burrito', burritoController.createBurrito);

router.get('/orders', orderController.getAllOrders)
router.get('/orders/:id', orderController.getOrder)
router.post('/orders', orderController.createOrder)

module.exports = router;
