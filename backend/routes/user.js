const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

module.exports = router;
// zod schema
const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
//create user or signup
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  //zod validation
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }
  //check if user already exists
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
  //create user
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  //create account
  await Account.create({
    userId,
    balance: 1 + Math.floor(Math.random() * 10000),
  });

  //generate token
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  //return token
  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
//signin
router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
//update credentials
router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  try {
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
      message: "Updated successfully",
    });
  } catch (e) {
    res.status(411).json({ message: "Credentials wrong or Server error" });
  }
});
//get users data
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
// delete user
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.userId });
    res.json({
      message: "Deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});
