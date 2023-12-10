"use server";

import { ChatType } from "@/lib/interfaces/chat.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import Chat from "@/lib/models/chat/chat.model";
import Message from "@/lib/models/chat/message.model";
import Parent from "@/lib/models/parent.model";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";

export async function getUserOptions({
  isParent,
  searchFilter,
}: {
  isParent: boolean;
  searchFilter: string;
}) {
  try {
    connectDB();

    let filter: any = {};

    // Add email condition to the filter if searchFilter is provided
    if (searchFilter) {
      filter.email = { $regex: new RegExp(searchFilter, "i") };
    }

    console.log("object");

    let results;

    if (isParent) {
      results = await User.find(filter)
        .sort({ createdAt: "desc" })
        .limit(5)
        .lean()
        .select("_id name email role")
        .exec();
    } else {
      results = await Parent.find(filter)
        .sort({ createdAt: "desc" })
        .limit(5)
        .lean()
        .select("_id name email")
        .exec();
    }

    const final: (UserType | ParentType)[] = results.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    return final;
  } catch (error: any) {
    throw new Error("Error in fetching chats", error.message);
  }
}

export async function createNewChat({
  senderId,
  recipientId,
}: {
  senderId: string;
  recipientId: string;
}) {
  try {
    connectDB();

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

export async function searchChatsAll({
  pageNumber = 1,
  pageSize = 20,
  userId,
  search,
}: {
  pageNumber: number;
  pageSize: number;
  userId: string;
  search: string;
}) {
  try {
    connectDB();

    console.log("object");

    const chatsData = await Chat.find({ users: { $in: userId } })
      .sort({ updatedAt: "desc" })
      .lean()
      .select("_id users")
      .populate({
        path: "latestMessage",
        model: Message,
        select: "_id content isRead sender createdAt isImage",
      })
      .exec();

    // Function to populate the users field based on their role
    const populateUsers = async (userIds: any) => {
      const users = await Promise.all(
        userIds.map(async (userId: any) => {
          // Check the role of the user based on the model
          const isParent = await Parent.exists({ _id: userId });
          if (isParent) {
            return await Parent.findById(userId)
              .select("_id name email")
              .lean();
          } else {
            return await User.findById(userId)
              .select("_id name email role")
              .lean();
          }
        })
      );

      return users;
    };

    const populatedChatsData = await Promise.all(
      chatsData.map(async (chat) => {
        // Populate the users field based on their role
        const users = await populateUsers(chat.users);

        // Return the chat data with the populated users field
        return {
          ...chat,
          _id: chat._id?.toString(),
          users: users.map((user) => ({
            ...user,
            _id: user._id.toString(),
          })),
          latestMessage: chat.latestMessage
            ? {
                ...chat.latestMessage,
                _id: chat.latestMessage._id?.toString(),
                sender: chat.latestMessage.sender
                  ? {
                      ...chat.latestMessage.sender,
                      _id: chat.latestMessage.sender._id?.toString(),
                    }
                  : null,
              }
            : null,
        };
      })
    );

    const plainData: ChatType[] = populatedChatsData.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        users: d.users.map((user: any) => {
          return {
            ...user,
            _id: user._id.toString(),
          };
        }),
        latestMessage: d.latestMessage
          ? {
              ...d.latestMessage,
              _id: d.latestMessage._id?.toString(),
              sender: d.latestMessage.sender
                ? {
                    ...d.latestMessage.sender,
                    _id: d.latestMessage.sender._id?.toString(),
                  }
                : null,
            }
          : null,
      };
    });

    console.log(plainData);

    return plainData;
  } catch (error: any) {
    throw new Error("Error in fetching chats", error.message);
  }
}
