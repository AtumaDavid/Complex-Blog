const express = require("express");
const {
  userRegisterController,
  userLoginController,
  getAllUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  profilePhotoUploadController,
  whoViewedMyProfileController,
} = require("../../controllers/users/userController");
const isLoginMiddleware = require("../../middleware/isLogin");
const storage = require("../../config/cloudinary");
const multer = require("multer");

const userRouter = express.Router();

//instance of multer
const upload = multer({ storage });

// register user
userRouter.post("/register", userRegisterController);

// login user
userRouter.post("/login", userLoginController);

// get users
userRouter.get("/", getAllUserController);

// get a particular user profile
// userRouter.get("/profile/:id", isLoginMiddleware, getUserController);
userRouter.get("/profile/", isLoginMiddleware, getUserController);

// who viewed my profile route
// GET/api/v1/users/profile-viewer/:id
userRouter.get(
  "/profile-viewer/:id",
  isLoginMiddleware,
  whoViewedMyProfileController
);

// update user
userRouter.put("/:id", updateUserController);

// user prpofile photo
userRouter.post(
  "/profile-photo-upload",
  isLoginMiddleware,
  upload.single("profile"),
  profilePhotoUploadController
);

// delete user
userRouter.delete("/:id", deleteUserController);

module.exports = userRouter;
