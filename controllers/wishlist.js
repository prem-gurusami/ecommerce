const WishList = require('../models/wishList');

module.exports.showWishlist = async (req, res) => {
  const { userId } = req;
  console.log(userId);
  const wishlist = await WishList.find({ _id: userId }).populate();
  console.log(wishlist);
  res.json(wishlist);
};

module.exports.addWishlist = async (req, res) => {
  const productId = req.body.name;
  const { userId } = req;
  console.log(userId);
  let wishlist;
  try {
    wishlist = await WishList.findOne({ _id: userId });
    if (wishlist) {
      // WishList.findOneAndUpdate({userId},{$push:{products:product}});
      if (!Array.isArray(wishlist.products)) {
        wishlist.products = [];
      }
      wishlist.products.push(productId);
      await wishlist.save();
    } else {
      wishlist = await WishList.create({
        _id: userId,
        products: [],
      });
      if (!Array.isArray(wishlist.products)) {
        wishlist.products = [];
      }
      wishlist.products.push(productId);
      await wishlist.save();
    }
    console.log(wishlist.populate());
    res.json({ wishlist });
  } catch (err) {
    console.log(`---> DB Error ---> ${err}`);
  }
};
