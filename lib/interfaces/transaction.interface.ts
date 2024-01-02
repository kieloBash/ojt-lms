import { AttendanceType } from "./attendance.interface";
import { ParentType } from "./parent.interface";
import { StudentType } from "./student.interface";

export interface TransactionsType {
  _id?: string;
  student: StudentType;
  parent: ParentType;
  price: number;
  status: TransactionStatusType;
  package: TransactionPackageType;
  classSchedule: AttendanceType[];
  createdAt: Date;
  paidAt: Date;
}

export type TransactionStatusType = "Paid" | "Not Paid" | "Declined";
export type TransactionPackageType = "AllInclusive" | "LessonsOnly";
export type NewTransactionPackageType = "Discover" | "Advance" | "Ultimate";
