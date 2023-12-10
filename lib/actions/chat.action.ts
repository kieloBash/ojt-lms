"use server";

// import { revalidatePath } from "next/cache";
import connectDB from "../mongodb";
import Chat from "../models/chat/chat.model";
import User from "../models/user.model";
import Message from "../models/chat/message.model";
import Parent from "../models/parent.model";
import { ChatType } from "../interfaces/chat.interface";
import { UserRolesType } from "../interfaces/user.interface";

export async function createNewChat({
  senderId,
  recipientEmail,
  role,
}: {
  senderId: string;
  recipientEmail: string;
  role: string;
}) {
  try {
    connectDB();

    let recipient;

    if (role === "parent") {
      recipient = await Parent.findOne({ email: recipientEmail });
    } else {
      recipient = await User.findOne({ email: recipientEmail, role: role });
    }

    if (recipient === null || !recipient) {
      return {
        message:
          "No recipient found with that email, maybe the email/role is incorrect",
        success: false,
      };
    }
    const recipientId = recipient._id.toString();
    const users = [recipientId, senderId];
    const existingChat = await Chat.findOne({
      users: { $all: users },
    });

    if (!existingChat) {
      const newChat = await Chat.create({
        chatName: null,
        users,
      });
      return {
        message: "Successfully Created New Chat",
        success: true,
        data: newChat._id.toString(),
      };
    }

    return {
      message: "Chat Already Exists",
      success: true,
      data: existingChat._id.toString(),
    };
  } catch (error: any) {
    throw new Error(`Error creating new chat: ${error.message}`);
  }
}

export async function fetchChats({
  pageNumber,
  pageSize,
  userId,
}: {
  pageNumber: number;
  pageSize: number;
  userId: string;
}) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const data = await Chat.find({ users: { $in: userId } })
      .sort({ updatedAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .select("_id users")
      .populate({
        path: "latestMessage",
        model: Message,
        select: "_id content isRead sender createdAt isImage",
      })
      .lean()
      .exec();

    const totalCount = await User.countDocuments({});

    for (let chat of data) {
      for (let i = 0; i < chat.users.length; i++) {
        let user = await User.findById(chat.users[i])
          .select("_id name email role profileURL")
          .lean();
        if (!user)
          user = await Parent.findById(chat.users[i])
            .select("_id name email profileURL")
            .lean();
        chat.users[i] = user;
      }
    }

    for (let chat of data) {
      let user = await User.findById(chat.latestMessage.sender)
        .select("_id name email role profileURL")
        .lean();
      if (!user)
        user = await Parent.findById(chat.latestMessage.sender)
          .select("_id name email profileURL")
          .lean();
      chat.latestMessage.sender = user;
    }

    const plainData: ChatType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        users: d.users.map((user: any) => {
          return {
            ...user,
            _id: user._id.toString(),
          };
        }),
        latestMessage: {
          ...d.latestMessage,
          _id: d.latestMessage._id.toString(),
          sender: {
            ...d.latestMessage.sender,
            _id: d.latestMessage.sender._id.toString(),
          },
        },
      };
    });

    const isNext = totalCount > skipAmount + plainData.length;

    return { chats: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching chats", error.message);
  }
}

export async function searchChats({
  pageNumber,
  pageSize,
  userId,
  search,
  filterRole,
}: {
  pageNumber: number;
  pageSize: number;
  userId: string;
  search: string;
  filterRole: UserRolesType | undefined;
}) {
  try {
    connectDB();

    if (search === "" && filterRole === undefined) {
      const { chats } = await fetchChats({ pageNumber, pageSize, userId });
      return { chats };
    }

    const searchFilter =
      search !== ""
        ? {
            email: { $regex: search, $options: "i" },
            _id: { $ne: userId },
          }
        : {};

    const roleFilter = {
      role: filterRole,
      _id: { $ne: userId },
    };

    const totalFilter =
      search !== "" || filterRole !== undefined
        ? search !== "" && filterRole !== undefined
          ? {
              email: { $regex: search, $options: "i" },
              role: filterRole,
              _id: { $ne: userId },
            }
          : search !== "" && filterRole === undefined
          ? searchFilter
          : roleFilter
        : { _id: { $ne: userId } };

    const usersData = await User.find(totalFilter)
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .exec();

    const users = usersData
      .filter((d: any) => d._id.toString())
      .map((d: any) => d._id.toString());

    const chatsData = await Chat.find({ users: { $in: userId } })
      .sort({ updatedAt: "desc" })
      .lean()
      .select("_id users")
      .populate({
        path: "latestMessage",
        model: Message,
        select: "_id content isRead sender createdAt isImage",
      })
      .exec()
      .then((chats) => {
        const filteredChats: any[] = [];
        chats.map((chat: any) => {
          const id1 = chat.users[0].toString();
          const id2 = chat.users[1].toString();
          if (users.includes(id1) || users.includes(id2))
            filteredChats.push(chat);
        });

        return filteredChats;
      });

    // STRINGIFYING DATA
    for (let chat of chatsData) {
      for (let i = 0; i < chat.users.length; i++) {
        let user = await User.findById(chat.users[i])
          .select("_id name email role profileURL")
          .lean();
        if (!user)
          user = await Parent.findById(chat.users[i])
            .select("_id name email role profileURL")
            .lean();
        chat.users[i] = user;
      }
    }
    for (let chat of chatsData) {
      let user = await User.findById(chat.latestMessage.sender)
        .select("_id name email role profileURL")
        .lean();
      if (!user)
        user = await Parent.findById(chat.latestMessage.sender)
          .select("_id name email role profileURL")
          .lean();
      chat.latestMessage.sender = user;
    }
    const plainData: ChatType[] = chatsData.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    return { chats: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching chats", error.message);
  }
}

export async function searchChatsAll({
  pageNumber,
  pageSize,
  userId,
  search,
  filterRole,
}: {
  pageNumber: number;
  pageSize: number;
  userId: string;
  search: string;
  filterRole: UserRolesType | undefined;
}) {
  try {
    connectDB();

    if (search === "" && filterRole === undefined) {
      const { chats } = await fetchChats({ pageNumber, pageSize, userId });
      return { chats };
    }

    const searchFilter =
      search !== ""
        ? {
            email: { $regex: search, $options: "i" },
            _id: { $ne: userId },
          }
        : {};

    const roleFilter = {
      role: filterRole,
      _id: { $ne: userId },
    };

    const totalFilter =
      search !== "" || filterRole !== undefined
        ? search !== "" && filterRole !== undefined
          ? {
              email: { $regex: search, $options: "i" },
              role: filterRole,
              _id: { $ne: userId },
            }
          : search !== "" && filterRole === undefined
          ? searchFilter
          : roleFilter
        : { _id: { $ne: userId } };

    const usersData = await User.find(totalFilter)
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .exec();

    const parentsData = await Parent.find({
      email: { $regex: search, $options: "i" },
      _id: { $ne: userId },
    })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .exec();

    const users = usersData
      .filter((d: any) => d._id.toString())
      .map((d: any) => d._id.toString());

    const parents = parentsData
      .filter((d: any) => d._id.toString())
      .map((d: any) => d._id.toString());

    const combinedIds = [...users, ...parents];

    const chatsData = await Chat.find({ users: { $in: userId } })
      .sort({ updatedAt: "desc" })
      .lean()
      .select("_id users")
      .populate({
        path: "latestMessage",
        model: Message,
        select: "_id content isRead sender createdAt isImage",
      })
      .exec()
      .then((chats) => {
        const filteredChats: any[] = [];
        chats.map((chat: any) => {
          const id1 = chat.users[0].toString();
          const id2 = chat.users[1].toString();
          if (combinedIds.includes(id1) || combinedIds.includes(id2))
            filteredChats.push(chat);
        });

        return filteredChats;
      });

    // STRINGIFYING DATA
    for (let chat of chatsData) {
      for (let i = 0; i < chat.users.length; i++) {
        let user = await User.findById(chat.users[i])
          .select("_id name email role profileURL")
          .lean();
        if (!user)
          user = await Parent.findById(chat.users[i])
            .select("_id name email role profileURL")
            .lean();
        chat.users[i] = user;
      }
    }
    for (let chat of chatsData) {
      let user = await User.findById(chat.latestMessage.sender)
        .select("_id name email role profileURL")
        .lean();
      if (!user)
        user = await Parent.findById(chat.latestMessage.sender)
          .select("_id name email profileURL")
          .lean();
      chat.latestMessage.sender = user;
    }

    const plainData: ChatType[] = chatsData.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        users: d.users.map((user: any) => {
          return {
            ...user,
            _id: user._id.toString(),
          };
        }),
        latestMessage: {
          ...d.latestMessage,
          _id: d.latestMessage._id.toString(),
          sender: {
            ...d.latestMessage.sender,
            _id: d.latestMessage.sender._id.toString(),
          },
        },
      };
    });

    console.log(plainData);
    return { chats: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching chats", error.message);
  }
}
