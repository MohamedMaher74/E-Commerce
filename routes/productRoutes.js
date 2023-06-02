const express = require('express');

const {
  getAllProducts,
  uploadProductImages,
  resizeProductImages,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');

const authController = require('../controllers/authController');

const reviewsRoutes = require('./reviewRoutes');

const router = express.Router();

router.use('/:productId/reviews', reviewsRoutes);

router.use(authController.protect);

router
  .route('/')
  .get(getAllProducts)
  .post(
    authController.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .patch(
    authController.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authController.allowedTo('admin', 'manager'),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
