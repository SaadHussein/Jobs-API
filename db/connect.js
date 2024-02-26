const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    console.log('Try To Connect To DB...');
    await mongoose.connect(url);
    console.log('Connected.');
  } catch (err) {
    return {
      message: "Error Happened.",
      error: err
    };
  }
};

module.exports = connectDB;
