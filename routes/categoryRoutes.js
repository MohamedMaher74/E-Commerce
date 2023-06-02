const express = require('express');

const {
  getAllCategories,
  uploadCategoryImage,
  resizeImage,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidtor');

const authController = require('../controllers/authController');

const subCategoryRoutes = require('./subCategoryRoutes');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRoutes);

router.use(authController.protect);

router
  .route('/')
  .get(getAllCategories)
  .post(
    authController.allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .patch(
    authController.allowedTo('admin', 'manager'),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authController.allowedTo('admin', 'manager'),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
