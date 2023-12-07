import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  attendance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "attendance",
  },
  filename: {
    type: String,
  },
  materials: {
    type: String,
  
  },
  classDate: {
    type: Date,
  },
  addedDate: {
    type: Date,
  },
  type: {
    type: String
  }
});
const Material =
  mongoose.models.material || mongoose.model("material", materialSchema);
export default Material;
