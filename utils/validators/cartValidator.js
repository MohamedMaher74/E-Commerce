const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Product = require('../../models/productModel');

exports.removeSpecificCartItemValidator = [
  check('itemId').isMongoId().withMessage('Invalid product id format'),
  validatorMiddleware,
];

exports.addProductToCartValidator = [
  check('productId')
    .notEmpty()
    .withMessage('product id required')
    .isMongoId()
    .withMessage('Invalid product id format')
    .custom((productId) =>
      Product.findById(productId).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No product for this id: ${productId}`)
          );
        }
      })
    ),

  check('color').notEmpty().withMessage('product color required'),

  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  validatorMiddleware,
];

exports.updateCartItemQuantityValidator = [
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  validatorMiddleware,
];

exports.applyCouponValidator = [
  check('coupon').notEmpty().withMessage('Coupon required'),
  validatorMiddleware,
];
