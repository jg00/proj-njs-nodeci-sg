jest.setTimeout(20000); // Adjust default amount of time to wait before automatically failing a 'single' test.

require("../models/User");

const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*
  mongoose.Promise - by default Mongoose does not want to use it's built-in
  Promise implementation and it want to you tell it what implementation
  of promises it should use.

  So here we are telling it to make use of the NodeJS global Promise object.
*/
