const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURL');

const connectDb = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error.message);
    // Exit Process With Failure
    process.exit(1);
  }
};

module.exports = connectDb;
