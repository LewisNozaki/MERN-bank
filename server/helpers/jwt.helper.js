const jwt = require("jsonwebtoken");
const path = require("path");
const rootDir = require("./path.helper");
const User = require("../models/user.models");
require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const maxAge = 3 * 24 * 60 * 60; // 3days in seconds

const createToken = (id) => {
  // Returns a JWT with a signature. Headers are already attached when created. 
  // First param is the payload. The second is the secret.
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: maxAge });
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    console.log("has token");
    // Callback
    const verifyCallBack = async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.decodedUser = null;
        next();
      } else {
        // Happy Path
        console.log(decodedToken);
        // Check the db for this user
        let user = await User.findById(decodedToken.id);

        if (user) {
          res.decodedUser = true;
        }

        next();
      }
    };
    
    jwt.verify(token, process.env.JWTSECRET, verifyCallBack);
  } else {
    res.decodedUser = null;
    next();
  }
};

module.exports = {
  createToken,
  checkUser
};