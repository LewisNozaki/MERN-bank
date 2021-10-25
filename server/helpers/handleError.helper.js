// Error handling and extracting from MongoDB validation
const handleErrors = (err) => {
  let errorsMsgs = { email: "", password: "", login: "" };
  
  // Incorrect email or password during login
  if (err.message === "Incorrect email" || err.message === "Incorrect password") {
    errorsMsgs.login = "The email/password combination was not valid. Please try again.";
  }
  
  // Duplicate error code
  if (err.code === 11000) {
    errorsMsgs.email = "That email has already been registered.";
    return errorsMsgs;
  }
  
  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorsMsgs[properties.path] = properties.message;
    })
  }

  return errorsMsgs;
};

module.exports = handleErrors;