const catchAsync = require('express-async-handler');
const handlersFactory = require('./handlersFactory');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getAllReviews = handlersFactory.getAll(Review);

exports.getReview = handlersFactory.getOne(Review);

exports.createReview = handlersFactory.createOne(Review);

exports.updateReview = handlersFactory.updateOne(Review);

// exports.deleteReview = handlersFactory.deleteOne(Review);
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const document = await Review.findByIdAndDelete(id);

  if (!document) {
    return next(new AppError(`No document for this id ${id}`, 404));
  }
  console.log(document);

  // document.remove();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
