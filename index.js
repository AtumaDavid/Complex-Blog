const express = require("express");
const userRouter = require("./routes/users/userRoutes");

const dotenv = require("dotenv");
dotenv.config();
require("./config/dbConnect");

const app = express();

// users
app.use("/api/v1/users/", userRouter);

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server listening in ${PORT}`));
