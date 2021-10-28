// Import the User model
const User = require("../models/user.models");

// Import Helper functions
const handleErrors = require("../helpers/handleError.helper");

const account_post = async (req, res) => {
  const { acctName, balance, id } = req.body; 

  try {
    const user = await User.findById(id);

    const newAccount = { acctName, balance };

    user.accounts.push(newAccount);

    user.markModified("accounts");
    
    const result = await user.save();

    res.send(result);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};


module.exports = {
  account_post
};