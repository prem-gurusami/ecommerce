const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
module.exports.dbcon = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.bjijzyz.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    console.log('DB Connected');
  } catch (error) {
    console.log('THIS IS DB ERROR');
    console.log(error);
  }
};
