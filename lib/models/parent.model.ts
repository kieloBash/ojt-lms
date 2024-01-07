import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      unique: true,
    },
    
    profileURL: {
      type: String,
    },

    isEnrolled: {
      type: Boolean,
      default: false,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Parent =
  mongoose.models.parents || mongoose.model("parents", parentSchema);
export default Parent;
