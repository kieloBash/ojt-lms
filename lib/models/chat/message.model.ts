import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isImage: {
      type: Boolean,
      default: false,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      // No 'ref' here
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

messageSchema.virtual("studentUsers", {
  ref: "Student",
  localField: "sender",
  foreignField: "_id",
  justOne: false,
});

messageSchema.virtual("parentUsers", {
  ref: "Parent",
  localField: "sender",
  foreignField: "_id",
  justOne: false,
});

messageSchema.virtual("adminUsers", {
  ref: "User",
  localField: "sender",
  foreignField: "_id",
  justOne: false,
});

const Message =
  mongoose.models.message || mongoose.model("message", messageSchema);
export default Message;
