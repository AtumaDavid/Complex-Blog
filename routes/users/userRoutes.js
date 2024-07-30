const express = require("express");
const {
  userRegisterController,
  userLoginController,
  getAllUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../../controllers/users/userController");
const isLoginMiddleware = require("../../middleware/isLogin");

const userRouter = express.Router();

// register user
userRouter.post("/register", userRegisterController);

// login user
userRouter.post("/login", userLoginController);

// get users
userRouter.get("/", getAllUserController);

// get a particular user profile
userRouter.get("/profile/:id", isLoginMiddleware, getUserController);

// update user
userRouter.put("/:id", updateUserController);

// delete user
userRouter.delete("/:id", deleteUserController);

module.exports = userRouter;
