const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { appErr } = require("../../utils/appErr");

// ! create transaction
const createTransactionCtrl = async (request, response, next) => {
  const { name, transactionType, amount, category, notes, account } =
    request.body;
  try {
    // TODO 01: Find user
    const userFound = await User.findById(request.user);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }

    // TODO 02: Find the account
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(appErr("Account not found", 404));
    }

    // TODO 03: Create the transaction
    const transaction = await Transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      createdBy: request.user,
    });

    // TODO 04: Push the transaction into the account
    accountFound.transactions.push(transaction._id);

    // TODO 05: Resave the account
    await accountFound.save();

    // ? send the response
    response.json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// ! get all transactions
const getTransactionsCtrl = async (request, response, next) => {
  try {
    const trans = await Transaction.find();
    response.status(200).json({
      status: "success",
      data: trans,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// ! get single transaction
const getTransactionCtrl = async (request, response) => {
  try {
    const { id } = request.params;
    const tran = await Transaction.findById(id);
    response.json({ status: "success", data: tran });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// ! delete transaction
const deleteTransactionCtrl = async (request, response, next) => {
  try {
    const { id } = request.params;
    await Transaction.findByIdAndDelete(id);
    response.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  createTransactionCtrl,
  getTransactionsCtrl,
  getTransactionsCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
