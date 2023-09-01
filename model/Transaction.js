const mongoose = require("mongoose");

// * transaction schema
const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["Income", "Expenses"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Utilities",
        "Health",
        "Travel",
        "Education",
        "Personal",
        "Groceries",
        "Bills",
        "Uncategorized",
        "Building",
        "Project",
      ],
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now(),
    },

    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// * model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
