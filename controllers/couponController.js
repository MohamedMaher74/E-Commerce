const handlersFactory = require('./handlersFactory');
const Coupon = require('../models/couponModel');

exports.getCoupons = handlersFactory.getAll(Coupon);

exports.getCoupon = handlersFactory.getOne(Coupon);

exports.createCoupon = handlersFactory.createOne(Coupon);

exports.updateCoupon = handlersFactory.updateOne(Coupon);

exports.deleteCoupon = handlersFactory.deleteOne(Coupon);
