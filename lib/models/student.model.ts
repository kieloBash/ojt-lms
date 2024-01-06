import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stripe_customer_id: {
      type: String,
    },
    profileURL: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },
    classSchedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
    package: {
      type: String,
    },
    status: {
      type: String,
      default: "Enrolling",
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.student || mongoose.model("student", studentSchema);
export default Student;
