import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      default: null,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // No 'ref' here
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

chatSchema.virtual("parentUsers", {
  ref: "Parent",
  localField: "users",
  foreignField: "_id",
  justOne: false,
});

chatSchema.virtual("adminUsers", {
  ref: "User",
  localField: "users",
  foreignField: "_id",
  justOne: false,
});

const Chat = mongoose.models.chat || mongoose.model("chat", chatSchema);
export default Chat;
