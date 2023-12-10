import { MessageType } from "@/lib/interfaces/message.interface";
import Chat from "@/lib/models/chat/chat.model";
import Message from "@/lib/models/chat/message.model";
import Parent from "@/lib/models/parent.model";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  const { recipientId, content, senderId } = await req.json();

  try {
    connectDB();

    const newMessage = await Message.create({
      content,
      sender: senderId,
    });
    const newChat = await Chat.create({
      chatName: null,
      users: [recipientId, senderId],
      latestMessage: newMessage._id,
    });
    // update the newMessage to get the Chat Id
    await Message.updateOne({ _id: newMessage._id }, { chat: newChat._id });

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
        { _id: newChat._id },
        {
          latestMessage: newMessage._id,
        }
      );

      pusherServer.trigger(newChat._id.toString(), "incoming-message", newMessage2);

      return new Response(JSON.stringify({ success: true, data: newChat._id }));
    }
  } catch (error) {
    console.log(error);
  }
}
