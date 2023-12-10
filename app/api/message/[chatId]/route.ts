import { MessageType } from "@/lib/interfaces/message.interface";
import Message from "@/lib/models/chat/message.model";
import Parent from "@/lib/models/parent.model";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  const chatId = params.chatId;
  //@ts-ignore
  const pageSize = req.nextUrl.searchParams.get("_limit");
  //@ts-ignore
  const pageNumber = req.nextUrl.searchParams.get("_page");
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const query = Message.find({ chat: chatId })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id content isRead sender createdAt")
      .exec();

    const data = await query;

    if (data) {
      for (let message of data) {
        let user = await User.findById(message.sender);
        if (!user) user = await Parent.findById(message.sender);
        message.sender = user;
      }

      const plainData: MessageType[] = data.map((d: any) => {
        return {
          ...d,
          _id: d._id?.toString(),
        };
      });

      return new Response(JSON.stringify({ success: true, data: plainData }));
    } else {
      return new Response(JSON.stringify({ success: true, data: [] }));
    }
  } catch (error) {
    console.log(error);
  }
}
