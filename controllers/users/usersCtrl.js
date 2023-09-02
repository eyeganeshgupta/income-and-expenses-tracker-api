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

// ! login
const userLoginCtrl = async (request, response, next) => {
  // ? destructing the request
  const { email, password } = request.body;
  try {
    // TODO: check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("Invalid login credentials", 400));
    }

    // TODO: check if password matches
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(appErr("Invalid login credentials", 400));
    }

    // ? sending the response
    response.json({
      status: "success",
      id: userFound._id,
      fullname: userFound.fullname,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// ! profile
const userProfileCtrl = async (request, response) => {
  // * request.user has userid
  try {
    const user = await User.findById(request.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    response.json(user);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  registerUserCtrl,
  userLoginCtrl,
};
