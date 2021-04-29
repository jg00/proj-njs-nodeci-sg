const Buffer = require("safe-buffer").Buffer;
const KeyGrip = require("keygrip");
const keys = require("../../config/keys");
const keygrip = new KeyGrip([keys.cookieKey]);

module.exports = (user) => {
  const sessionObject = {
    passport: {
      user: user._id.toString(),
    },
  };

  const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64");

  const sig = keygrip.sign("session=" + session);

  return { session, sig };
};

/*
  1 'user' is a Mongoose model user
  
  - The Mongoose modle ._id property is not a string.  It is actually 
  a Javascript object that constains that user's id.
  'user._id' is actually a Javascript object so before we try to turn that into
  JSON we have to turn that object into a string.
  .toString() takes the string out of the object and prints the string by itself.
  

  2 Build session object with specific structure
*/
