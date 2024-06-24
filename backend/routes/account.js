const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
module.exports = router;

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    const username = await User.findOne({
      _id: req.userId,
    });
    res.json({
      username: `${username.firstName} ${username.lastName}`,
      balance: account.balance,
    });
  } catch (e) {
    res.status(400).json({
      message: "User Not Found",
    });
  }
});
// With Transaction
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "No User Exists or Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Recipient Account",
    });
  }
  //performing the transaction
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -Number(amount) } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: Number(amount) } }
  ).session(session);

  //commiting the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer Successful",
    success: true,
  });
});
