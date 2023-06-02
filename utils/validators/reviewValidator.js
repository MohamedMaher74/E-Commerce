const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');

exports.createReviewValidator = [
  check('title').optional(),

  check('rating')
    .notEmpty()
    .withMessage('rating value required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating value must be between 1 to 5'),

  check('user')
    .notEmpty()
    .withMessage('userId is required')
    .isMongoId()
    .withMessage('Invalid User id format')
    .custom((userId) =>
      User.findById(userId).then((user) => {
        if (!user) {
          return Promise.reject(new Error(`No user for this id: ${userId}`));
        }
      })
    ),

  check('product')
    .notEmpty()
    .withMessage('productId is required')
    .isMongoId()
    .withMessage('Invalid Product id format')
    .custom((productId) =>
      Product.findById(productId).then((product) => {
        if (!product) {
          return Promise.reject(
            new Error(`No product for this id: ${productId}`)
          );
        }
      })
    )
    .custom((val, { req }) =>
      // Check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          console.log(review);
          if (review) {
            return Promise.reject(
              new Error('You already created a review before')
            );
          }
        }
      )
    ),
  validatorMiddleware,
];

exports.getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Review id format'),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) =>
      // Check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
  check('title').optional(),

  check('rating')
    .notEmpty()
    .withMessage('rating value required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating value must be between 1 to 5'),

  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((val, { req }) => {
      // Check review ownership before update
      if (req.user.role === 'user') {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error(`Your are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
