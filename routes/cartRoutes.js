const express = require('express');

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require('../controllers/cartController');

const {
  addProductToCartValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator,
  removeSpecificCartItemValidator,
} = require('../utils/validators/cartValidator');

const authService = require('../controllers/authController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router
  .route('/')
  .post(addProductToCartValidator, addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.patch('/applyCoupon', applyCouponValidator, applyCoupon);

router
  .route('/:itemId')
  .patch(updateCartItemQuantityValidator, updateCartItemQuantity)
  .delete(removeSpecificCartItemValidator, removeSpecificCartItem);

module.exports = router;
