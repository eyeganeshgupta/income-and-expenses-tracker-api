const express = require("express");
const {
  createAccountCtrl,
  deleteAccountCtrl,
  getAccountCtrl,
  updateAccountCtrl,
  getAccountsCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountRoutes = express.Router();

//? POST/api/v1/accounts
accountRoutes.post("/", isLogin, createAccountCtrl);

// ? GET/api/v1/accounts/:id
accountRoutes.get("/:id", getAccountCtrl);

// ? DELETE/api/v1/accounts/:id
accountRoutes.delete("/:id", deleteAccountCtrl);

// ? PUT/api/v1/accounts/:id
accountRoutes.put("/:id", updateAccountCtrl);

// ? GET/api/v1/accounts
accountRoutes.get("/", getAccountsCtrl);

module.exports = accountRoutes;
