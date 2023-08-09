require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  // Database connection 🥳😁
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.on(
    "error",
    console.error.bind(console, "Connection failed 😤😤😤😤 check again")
  );

  connection.once("open", function () {
    console.log("Database connected 😱😱😱😱");
  });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;
