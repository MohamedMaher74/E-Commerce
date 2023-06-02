const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Product = require('../../models/productModel');

exports.addProductToWishlistValidator = [
  check('productId')
    .notEmpty()
    .withMessage('Product id must be provided!')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((productID) =>
      Product.findById(productID).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No Product for this id: ${productID}`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.removeProductToWishlistValidator = [
  check('productId')
    .notEmpty()
    .withMessage('Product id must be provided!')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((productID) =>
      Product.findById(productID).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No Product for this id: ${productID}`)
          );
        }
      })
    )
    .custom((val, { req }) => {
      if (!req.user.wishlist.includes(val)) {
        return Promise.reject(new Error('Product is not in wishlist'));
      }
      return true;
    }),
  validatorMiddleware,
];
