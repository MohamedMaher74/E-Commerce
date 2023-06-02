const express = require('express');

const {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require('../controllers/reviewController');

const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require('../utils/validators/reviewValidator');

const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(createFilterObj, getAllReviews)
  .post(
    authController.allowedTo('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );

router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .patch(authController.allowedTo('user'), updateReviewValidator, updateReview)
  .delete(
    authController.allowedTo('user', 'admin', 'manager'),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
