import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
  },
  date: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    default: "",
  },
  ageGroup: {
    type: String,
    enum: ["N1", "N2", "K1", "K2"],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  materials: [
    {
      type: String,
    },
  ],
  studentsPresent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  studentsNotPresent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  classParticipants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Attendance =
  mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);
export default Attendance;
