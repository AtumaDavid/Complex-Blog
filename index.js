const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoute");
const commentsRouter = require("./routes/comments/commentsRoute");

const dotenv = require("dotenv");

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

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server listening in ${PORT}`));
