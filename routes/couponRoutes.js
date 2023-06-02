const express = require('express');

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../controllers/couponController');

const {
  getCouponValidator,
  createCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
} = require('../utils/validators/couponValidator');

const authController = require('../controllers/authController');

const router = express.Router();

router.use(
  authController.protect,
  authController.allowedTo('admin', 'manager')
);

router.route('/').get(getCoupons).post(createCouponValidator, createCoupon);

router
  .route('/:id')
  .get(getCouponValidator, getCoupon)
  .patch(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

module.exports = router;
