const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || firstName.length < 4 || firstName.length > 50) {
    throw new Error(
      " First name is required and must be between 4 and 50 characters",
    );
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error(" A valid email address is required");
  }

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error(" Enter Valid Password");
  }
};

module.exports = validateSignupData;
