const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const handlersFactory = require('./handlersFactory');
const Brand = require('../models/brandModel');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

// Upload single image
exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/brands/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getAllBrands = handlersFactory.getAll(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = handlersFactory.getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = handlersFactory.createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = handlersFactory.updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = handlersFactory.deleteOne(Brand);
