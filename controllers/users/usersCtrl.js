const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const { appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");

// ! register
const registerUserCtrl = async (request, response, next) => {
  // ? destructing the request
  const { fullname, password, email } = request.body;
  try {
    // TODO: check if email already exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User Already Exists", 400));
    }

    // TODO: hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // TODO: create/register an user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // ? send the response
    response.json({
      status: "success",
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  registerUserCtrl,
};
