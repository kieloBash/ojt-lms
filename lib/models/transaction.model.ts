import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Not Paid",
    },
    package: {
      type: String,
      required: true,
    },
    classSchedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
export default Transaction;
