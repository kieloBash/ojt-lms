import { ChatType } from "./chat.interface";
import { ParentType } from "./parent.interface";
import { StudentType } from "./student.interface";
import { UserType } from "./user.interface";

export interface MessageType {
  _id?: string;
  content: string;
  isRead: boolean;
  isImage: boolean;
  chat: ChatType;
  sender: UserType | ParentType;
  createdAt: Date;
}

// export type SenderRoles = "parent" | "student" | "admin";
export type SenderRoles =
  | "parent"
  | "student"
  | "general manager"
  | "customer support"
  | "teacher"
  | "financial manager";
