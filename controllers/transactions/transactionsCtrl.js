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

module.exports = {
  createTransactionCtrl,
  getTransactionsCtrl,
  getTransactionsCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
