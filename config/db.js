const mongoose = require("mongoose");

// Connects to MongoDB Atlas using the URI stored in .env
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
