const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const protected = async (req, res, next) => {
  // check for jwt in the cookies
  const token = req.cookies.jwt;
  
  // if jwt is not found, set the isAuth on req to false and run the next();
  if (!token) {
    req.isAuth = false;

    next();
  } else {
    // If jwt is found, verify with secret
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
      // if not verifiable, set req.isAuth to false and run next();
      if (err) {
        req.isAuth = false;
        next()
      } else {
        // If jwt exists and is verified, look through db for the user with the decodedToken, which was previously set with the user._id
        let user = await User.findById(decodedToken.id);
        
        req.userInfo = { email: user.email, id: user._id };
        
        req.isAuth = true;

        next();
      }
    });
  }
};

module.exports = protected;