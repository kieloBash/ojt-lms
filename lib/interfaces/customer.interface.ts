import { ClassesType } from "./class.interface";
import { TransactionType } from "./transaction.interface";

export interface CustomerType {
  _id?: string;
  child_name: string;
  child_age: number;
  parent_phone: string;
  parent_name: string;
  parent_email: string;
  status: CustomerStatus;
  transactions?: TransactionType[];
  createdDate?: Date;
  classExpiryDate?: Date;
  enrolledClass?: ClassesType;
}

export type CustomerStatus = "Paid" | "Not Paid";
