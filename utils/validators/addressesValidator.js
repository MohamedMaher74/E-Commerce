const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.addAddressValidator = [
  check('alias').notEmpty().withMessage('alias must be provided!'),

  check('details').notEmpty().withMessage('details must be provided!'),

  check('phone').notEmpty().withMessage('phone must be provided!'),

  check('city').notEmpty().withMessage('city must be provided!'),

  check('postCode').notEmpty().withMessage('postCode must be provided!'),
  validatorMiddleware,
];

exports.removeAddressValidator = [
  check('addressId')
    .notEmpty()
    .withMessage('Product id must be provided!')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((val, { req }) => {
      const checker = req.user.addresses.find(
        (obj) => obj._id.toString() === val
      );
      if (!checker) {
        return Promise.reject(
          new Error('This address is not in your addresses')
        );
      }
      return true;
    }),
  validatorMiddleware,
];
