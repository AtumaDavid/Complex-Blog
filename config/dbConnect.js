const monngoose = require("mongoose");

// function to connect
const dbConnect = async () => {
  try {
    await monngoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
