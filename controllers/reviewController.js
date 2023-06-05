const catchAsync = require('express-async-handler');
const handlersFactory = require('./handlersFactory');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

// Nested route
// GET /api/v1/products/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

// Nested route (Create)
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

// @desc    Get list of reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getAllReviews = handlersFactory.getAll(Review);

// @desc    Get specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = handlersFactory.getOne(Review);

// @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/Protect/User
exports.createReview = handlersFactory.createOne(Review);

// @desc    Update specific review
// @route   PUT /api/v1/reviews/:id
// @access  Private/Protect/User
exports.updateReview = handlersFactory.updateOne(Review);

// @desc    Delete specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/Protect/User-Admin-Manager
exports.deleteReview = handlersFactory.deleteOne(Review);
//! Can't delete review rating from product's rating.
