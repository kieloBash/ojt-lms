import { AttendanceType } from "./attendance.interface";
import { ParentType } from "./parent.interface";
import { StudentType } from "./student.interface";

// export interface TransactionType {
//   _id?: string;
//   class?: ClassesType;
//   price: number;
//   duration: DurationType;
//   customer?: CustomerType;
//   status: TransactionStatusType;
//   paidDate?: Date;
//   expiryDate?: Date;
// }
export interface TransactionsType {
  _id?: string;
  student: StudentType;
  parent: ParentType;
  price: number;
  status: TransactionStatusType;
  package: TransactionPackageType;
  classSchedule: AttendanceType[];
}

export type TransactionStatusType = "Paid" | "Not Paid" | "Declined";
export type TransactionPackageType = "AllInclusive" | "LessonsOnly";
