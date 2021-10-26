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
  
  if (!token) {
    res.status(400).json({ auth: false, message: "No token found" });
  } else {
    jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ error: "Could not authenticate." });
      } else {
        console.log("decoded:", decodedToken);

        let user = await User.findById(decodedToken.id);

        req.userInfo = { email: user.email, id: user._id };
        req.isAuth = true;

        next();
      }
    });
  }
};

module.exports = {
  createToken,
  checkUser
};