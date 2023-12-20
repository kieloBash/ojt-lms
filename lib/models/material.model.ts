import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    attendance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attendance",
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    classDate: {
      type: Date,
    },
    gradeLevel: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
    },
  },
  { timestamps: true }
);
const Material =
  mongoose.models.material || mongoose.model("material", materialSchema);
export default Material;
