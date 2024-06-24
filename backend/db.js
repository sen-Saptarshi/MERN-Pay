const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
  // Additional logic here
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
});
// Users Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
});

const User = mongoose.model("User", userSchema);
// Accounts Schema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
