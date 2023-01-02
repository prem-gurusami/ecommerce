const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { _id: false },
);

module.exports = mongoose.model('wishlist', WishListSchema);
