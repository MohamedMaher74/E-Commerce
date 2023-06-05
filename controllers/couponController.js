const handlersFactory = require('./handlersFactory');
const Coupon = require('../models/couponModel');

// @desc    Get list of coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin-Manager
exports.getCoupons = handlersFactory.getAll(Coupon);

// @desc    Get specific coupon by id
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.getCoupon = handlersFactory.getOne(Coupon);

// @desc    Create coupon
// @route   POST  /api/v1/coupons
// @access  Private/Admin-Manager
exports.createCoupon = handlersFactory.createOne(Coupon);

// @desc    Update specific coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.updateCoupon = handlersFactory.updateOne(Coupon);

// @desc    Delete specific coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.deleteCoupon = handlersFactory.deleteOne(Coupon);
