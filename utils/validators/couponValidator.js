const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCouponValidator = [
  check('id').isMongoId().withMessage('Invalid Coupon id format'),
  validatorMiddleware,
];

exports.createCouponValidator = [
  check('name')
    .notEmpty()
    .withMessage('Coupon required')
    .isLength({ min: 3 })
    .withMessage('Too short Coupon name')
    .isLength({ max: 32 })
    .withMessage('Too long Coupon name'),
  check('expire').notEmpty().withMessage('Coupon expire date required'),
  check('discount')
    .notEmpty()
    .withMessage('Coupon discount is required')
    .isNumeric()
    .withMessage('Coupon discount must be a number'),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check('name')
    .optional()
    .notEmpty()
    .withMessage('Coupon required')
    .isLength({ min: 3 })
    .withMessage('Too short Coupon name')
    .isLength({ max: 32 })
    .withMessage('Too long Coupon name'),
  check('expire')
    .optional()
    .notEmpty()
    .withMessage('Coupon expire date required'),
  check('discount')
    .optional()
    .notEmpty()
    .withMessage('Coupon discount is required')
    .isNumeric()
    .withMessage('Coupon discount must be a number'),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check('id').isMongoId().withMessage('Invalid Coupon id format'),
  validatorMiddleware,
];
