const Product = require('../models/product');
// const WishList = require("../models/wishList");

module.exports.showProducts = async (req, res) => {
  // const wishList = await WishList.findOne({ _id: id });
  const products = await Product.find();
  res.json(products);
};
