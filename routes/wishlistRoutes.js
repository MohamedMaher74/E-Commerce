const express = require('express');

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require('../controllers/wishListController');

const {
  addProductToWishlistValidator,
  removeProductToWishlistValidator,
} = require('../utils/validators/wishlistValidator');

const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.allowedTo('user'));

router
  .route('/')
  .post(addProductToWishlistValidator, addProductToWishlist)
  .get(getLoggedUserWishlist)
  .delete(removeProductToWishlistValidator, removeProductFromWishlist);

module.exports = router;
