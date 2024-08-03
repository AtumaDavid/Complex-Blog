const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoute");
const commentsRouter = require("./routes/comments/commentsRoute");

const dotenv = require("dotenv");
const globalErrHandler = require("./middleware/globalErrorHandler");

dotenv.config();
require("./config/dbConnect");

const app = express();

// middleware
app.use(express.json()); //pass incoming payload

// users
app.use("/api/v1/users/", userRouter);

// posts
app.use("/api/v1/posts/", postRouter);

// categories
app.use("/api/v1/categories/", categoryRouter);

// comments
app.use("/api/v1/comments/", commentsRouter);

// error handler middleware
app.use(globalErrHandler);

// 404 error (not found)
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - Route Not found`,
  });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server listening in ${PORT}`));
