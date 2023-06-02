const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
// const AppError = require('../utils/appError');

exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  user.save();

  res.status(200).json({
    status: 'success',
    message: 'Product added successfully to your wishlist.',
    data: user.wishlist,
  });
});

exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.body.productId },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  user.save();

  res.status(200).json({
    status: 'success',
    message: 'Product removed successfully from your wishlist.',
    data: user.wishlist,
  });
});

exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: 'success',
    data: user.wishlist,
  });
});
