const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Username is required"], unique: true, trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true },
    // select:false -> password is NOT returned by queries unless we ask for it
    password: { type: String, required: [true, "Password is required"], minlength: 6, select: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
