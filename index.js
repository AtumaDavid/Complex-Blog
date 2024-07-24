const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
require("./config/dbConnect");

const app = express();

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server listening in ${PORT}`));
