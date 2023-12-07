import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    child_name: {
      type: String,
      required: true,
    },
    child_age: {
      type: Number,
      required: true,
    },
    form_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Leads = mongoose.models.leads || mongoose.model("leads", leadsSchema);
export default Leads;
