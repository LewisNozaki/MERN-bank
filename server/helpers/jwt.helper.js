const jwt = require("jsonwebtoken");
const path = require("path");
const rootDir = require("./path-helper");
const User = require("../models/user.models");
require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const maxAge = 3 * 24 * 60 * 60; // 3days in seconds

const createToken = (id) => {
  // Returns a JWT with a signature. Headers are already attached when created. 
  // First param is the payload. The second is the secret.
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: maxAge });
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  // check jwt exists in cookies and is verified
  if (token) {
    const verifyCallBack = (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    };
    
    jwt.verify(token, process.env.JWTSECRET, verifyCallBack);
  } else {
    // Else, redirect to the login page
    res.redirect("/login");
  }

  next();
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    // Callback
    const verifyCallBack = async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        // Check the db for this user
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    };
    
    jwt.verify(token, process.env.JWTSECRET, verifyCallBack);
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  createToken,
  requireAuth,
  checkUser
};