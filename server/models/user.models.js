// Import Mongoose
const { Schema, model } = require("mongoose");

// Import the validator package
const { isEmail } = require("validator");

// Import bcrypt
const bcrypt = require("bcrypt");

const emailReq = {
  type: String,
  required: [true, "Please enter an email."],
  unique: true,
  lowercase: true,
  validate: [isEmail, "Please enter a valid email."]
};

const passwordReq = {
  type: String,
  required: [true, "Please enter a password."],
  minlength: [6, "The minimum password length is 6 characters."]
};

const userSchema = new Schema({
  email: emailReq,
  password: passwordReq
}, { timestamps: true });

// Pre method - hash password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Custom atatic method on user model for login
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user
    }
    
    throw Error("Incorrect password");
  }

  throw Error("Incorrect email");
};

const User = model("user", userSchema);

module.exports = User;