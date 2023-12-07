import mongoose from "mongoose";

const classesSchema = new mongoose.Schema(
  {
    class: {
      type: String,
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
    day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      enum: ["blue", "red", "green", "orange"],
      default: "blue",
    },
    ageGroup: {
      type: String,
      enum: ["N1", "N2", "K1", "K2"],
      required: true,
    },
    zoomLink: {
      type: String,
      default: "",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const Classes =
  mongoose.models.classes || mongoose.model("classes", classesSchema);
export default Classes;
