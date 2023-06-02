const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: [true, 'Brand must be unique'],
      minlength: [3, 'Too short brand name'],
      maxlength: [32, 'Too long brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};

// findOne, findAll and update
brandSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
brandSchema.post('save', (doc) => {
  setImageURL(doc);
});

const BrandModel = mongoose.model('Brand', brandSchema);

module.exports = BrandModel;
