import { MessageType } from "./message.interface";
import { ParentType } from "./parent.interface";
import { UserType } from "./user.interface";

export interface ChatType {
  _id?: string;
  chatName: string;
  latestMessage: MessageType | null;
  users: (UserType | ParentType)[];
}
