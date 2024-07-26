const express = require("express");

const userRouter = express.Router();

// register user
userRouter.post("/register", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user registered",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// login user
userRouter.post("/login", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user logged in",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// get users
userRouter.get("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "gotten all users",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// get a particular user
userRouter.get("/profile/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "gotten users",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user deleted",
    });
  } catch (error) {
    res.json(error.message);
  }
});

// update user
userRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      data: "user updated",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = userRouter;
