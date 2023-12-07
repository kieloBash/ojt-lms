// import mongoose from "mongoose";

// const customerSchema = new mongoose.Schema(
//   {
//     child_name: {
//       type: String,
//       required: true,
//     },
//     child_age: {
//       type: Number,
//       required: true,
//     },
//     parent_phone: {
//       type: String,
//       required: true,
//     },
//     parent_name: {
//       type: String,
//       required: true,
//     },
//     parent_email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     enrolledClass: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Classes",
//     },
//     status: {
//       type: String,
//       default: "Not Paid",
//     },
//     classExpiryDate: {
//       type: Date,
//       default: null,
//     },
//     transactions: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Transaction",
//         required: true,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Customer =
//   mongoose.models.customer || mongoose.model("customer", customerSchema);
// export default Customer;
