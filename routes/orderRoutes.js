const express = require('express');

const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../controllers/orderController');

const authService = require('../controllers/authController');

const router = express.Router();

router.use(authService.protect);

router.get(
  '/checkout-session/:cartId',
  authService.allowedTo('user'),
  checkoutSession
);

router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);

router.get(
  '/',
  authService.allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);

router.get('/:id', findSpecificOrder);

router.patch(
  '/:id/pay',
  authService.allowedTo('admin', 'manager'),
  updateOrderToPaid
);

router.patch(
  '/:id/deliver',
  authService.allowedTo('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;
