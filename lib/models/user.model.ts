import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  image: String,
  profileURL: String,
  role: {
    type: String,
    enum: [
      "general manager",
      "customer support",
      "teacher",
      "sales manager",
      "no role",
    ],
    default: "no role",
  },
  provider: {
    type: String,
    default: "credentials",
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
