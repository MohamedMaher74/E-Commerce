const express = require('express');

const {
  createFilterObj,
  getAllSubCategories,
  setCategoryId,
  createSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategoryController');

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidtor');

const authController = require('../controllers/authController');

// mergeParams: ALlow us to access parameters on other routes.
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(createFilterObj, getAllSubCategories)
  .post(
    authController.allowedTo('admin', 'manager'),
    setCategoryId,
    createSubCategoryValidator,
    createSubCategory
  );

router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .patch(
    authController.allowedTo('admin', 'manager'),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    authController.allowedTo('admin', 'manager'),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
