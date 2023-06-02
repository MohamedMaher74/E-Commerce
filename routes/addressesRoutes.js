const express = require('express');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controllers/addressesController');

const {
  addAddressValidator,
  removeAddressValidator,
} = require('../utils/validators/addressesValidator');

const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.allowedTo('user'));

router
  .route('/')
  .post(addAddressValidator, addAddress)
  .get(getLoggedUserAddresses)
  .delete(removeAddressValidator, removeAddress);

module.exports = router;
