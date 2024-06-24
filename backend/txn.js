const mongoose = require("mongoose");
const Account = require("./db");

const transferFunds = async (fromAccountId, toAccountId, amount) => {
  // Decrement the balance of the fromAccount
  await Account.findByIdAndUpdate(fromAccountId, {
    $inc: { balance: -amount },
  });

  // Increment the balance of the toAccount
  await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
};

// Example usage
transferFunds("fromAccountID", "toAccountID", 100);
