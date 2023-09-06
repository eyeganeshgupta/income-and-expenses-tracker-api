const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
// TODO: database connection
require("./config/dbConnect");
const usersRoute = require("./routes/users/usersRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");
const accountRoutes = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");

const app = express();

// ! middlewares
// ? pass the incoming data
app.use(express.json());

// ! routes
// * users route
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/transactions", transactionsRoute);

// ! error handlers
app.use(globalErrHandler);

// ! listen to server
const PORT = 2080;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
