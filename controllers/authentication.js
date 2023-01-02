/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.renderSignup = (req, res) => {
  res.render('./signup');
};

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      // await User.create({name:username,email:email,password:hashedPassword});
      user = new User({
        name: username,
        email,
        password: hashedPassword,
      });
      user.save();
      res.json({ message: 'Succesfully signed up' });
    } else {
      res.json({ message: 'User already exists' });
    }
  } else {
    res.json({ messaage: 'Email or Password or Username is missing' });
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('./login');
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user;
  if (email && password) {
    user = await User.findOne({ email });
    const userId = user._id;
    if (!user) {
      res.json({ message: 'The user is not registered' });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = await jwt.sign({ userId }, process.env.HASH_KEY, {
          expiresIn: '7d',
        });
        res.cookie('token', token, {
          httpOnly: true,
        });
        res.json({ message: 'Successfully Logged in' });
      } else {
        res.json({ message: 'User Name or Password not correct' });
      }
    }
  } else {
    res.json({ message: 'username or password is empty.' });
  }
};
