const Account = require("../../model/Account");
const User = require("../../model/User");
const { appErr } = require("../../utils/appErr");

// ! create
const createAccountCtrl = async (request, response, next) => {
  const { name, initialBalance, accountType, notes } = request.body;
  try {
    // TODO 01: Find the loggedIn user
    const userFound = await User.findById(request.user);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }

    // TODO 02: Create the account
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: request.user,
    });

    // TODO 03: Push the account into users accounts field
    userFound.accounts.push(account._id);

    // TODO 04: Resave the user
    await userFound.save();

    // ? send the response
    response.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

// ! get all accounts
const getAccountsCtrl = async (request, response) => {
  try {
    const accounts = await Account.find().populate("transactions");
    response.json(accounts);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// ! get single acoount
const getAccountCtrl = async (request, response, next) => {
  try {
    // TODO: find the id from params
    const { id } = request.params;

    const account = await Account.findById(id).populate("transactions");

    // ? sending the response
    response.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createAccountCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
  getAccountsCtrl,
};
