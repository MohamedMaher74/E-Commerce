const express = require('express');

const {
  getAllBrands,
  uploadBrandImage,
  resizeImage,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');

const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(getAllBrands)
  .post(
    authController.allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .patch(
    authController.allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    authController.allowedTo('admin', 'manager'),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
