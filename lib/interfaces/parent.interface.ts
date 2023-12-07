import { StudentType } from "./student.interface";
import { TransactionsType } from "./transaction.interface";

export interface ParentType {
  _id?: string;
  name: string;
  email: string;
  profileURL?: string;
  children?: StudentType[];
  transactions?: TransactionsType[];
  isAccepted: Boolean;
  role?: string;
}
