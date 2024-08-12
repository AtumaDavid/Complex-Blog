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
  followingController,
  unfollowController,
  blockUserController,
  unBlockUserController,
  adminBlockUserController,
  adminUnblockUserController,
} = require("../../controllers/users/userController");
const isLoginMiddleware = require("../../middleware/isLogin");
const storage = require("../../config/cloudinary");
const multer = require("multer");
const isAdminMiddleware = require("../../middleware/isAdmin");

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

//following
userRouter.get("/following/:id", isLoginMiddleware, followingController);

//unfollow
userRouter.get("/unfollow/:id", isLoginMiddleware, unfollowController);

//blocked
userRouter.get("/blocked/:id", isLoginMiddleware, blockUserController);

// unblock user
userRouter.get("/unblocked/:id", isLoginMiddleware, unBlockUserController);

// admin-block user
userRouter.put(
  "/admin-block/:id",
  isLoginMiddleware,
  isAdminMiddleware,
  adminBlockUserController
);

// admin-unblock user
userRouter.put(
  "/admin-unblock/:id",
  isLoginMiddleware,
  isAdminMiddleware,
  adminUnblockUserController
);

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
