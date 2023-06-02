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

exports.getAllBrands = handlersFactory.getAll(Brand);

exports.getBrand = handlersFactory.getOne(Brand);

exports.createBrand = handlersFactory.createOne(Brand);

exports.updateBrand = handlersFactory.updateOne(Brand);

exports.deleteBrand = handlersFactory.deleteOne(Brand);
