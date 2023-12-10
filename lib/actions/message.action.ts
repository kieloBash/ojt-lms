"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../mongodb";
import Message from "../models/chat/message.model";
import User from "../models/user.model";
import Parent from "../models/parent.model";
import { MessageType } from "../interfaces/message.interface";

// export async function createMessage({
//   chatId,
//   senderId,
//   message,
//   path,
// }: {
//   chatId: string;
//   senderId: string;
//   message: string;
//   path: string;
// }) {
//   try {
//     connectDB();

//     const existingChat = await Chat.findById({
//       _id: chatId,
//     });

//     console.log(existingChat);

//     if (!existingChat) {
//       throw new Error(`Error no existing Chat`);
//     }

//     const newMessage = await Message.create({
//       chat: chatId,
//       content: message,
//       sender: senderId,
//     });

//     await Chat.findByIdAndUpdate(
//       { _id: chatId },
//       {
//         latestMessage: newMessage._id,
//       }
//     );
//     revalidatePath(path);

//     return {
//       message: "Successfully Created New Message",
//       success: true,
//     };
//   } catch (error: any) {
//     throw new Error(`Error creating new chat: ${error.message}`);
//   }
// }

export async function fetchMessages({
  pageNumber,
  pageSize,
  chatId,
}: {
  pageNumber: number;
  pageSize: number;
  chatId: string;
}) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const data = await Message.find({ chat: chatId })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .select("_id content isRead sender createdAt isImage")
      .lean()
      .exec();

    const totalCount = await User.countDocuments({});

    for (let message of data) {
      let user = await User.findById(message.sender)
        .select("_id name email photoURL")
        .lean();
      if (!user)
        user = await Parent.findById(message.sender)
          .select("_id name email photoURL")
          .lean();
      message.sender = user;
    }

    const plainData: MessageType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        sender: {
          ...d.sender,
          _id: d.sender._id.toString(),
        },
      };
    });

    const isNext = totalCount > skipAmount + plainData.length;

    return { messages: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching messages", error.message);
  }
}
