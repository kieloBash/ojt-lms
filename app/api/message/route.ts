import { MessageType } from "@/lib/interfaces/message.interface";
import Chat from "@/lib/models/chat/chat.model";
import Message from "@/lib/models/chat/message.model";
import Parent from "@/lib/models/parent.model";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { chatId, content, senderId, isImage } = await req.json();

  try {
    connectDB();

    const existingChat = await Chat.findById({
      _id: chatId,
    });

    console.log(existingChat);

    if (!existingChat) {
      throw new Error(`Error no existing Chat`);
    }

    const newMessage = await Message.create({
      chat: chatId,
      content,
      sender: senderId,
      isImage,
    });

    const query = Message.findById(newMessage._id)
      .lean()
      .select("_id content isRead sender createdAt")
      .exec();

    const data = await query;

    if (!data) {
      throw new Error(`Error no message found`);
    } else {
      const newMessage2: MessageType = data as MessageType;

      let user = await User.findById(newMessage2.sender);
      if (!user) user = await Parent.findById(newMessage2.sender);
      newMessage2.sender = user;

      await Chat.findByIdAndUpdate(
        { _id: chatId },
        {
          latestMessage: newMessage._id,
        }
      );

      pusherServer.trigger(chatId, "incoming-message", newMessage2);
      pusherServer.trigger(senderId, "fetch-chats", "");

      return new Response(JSON.stringify({ data: newMessage2 }));
    }
  } catch (error) {
    console.log(error);
  }
}
