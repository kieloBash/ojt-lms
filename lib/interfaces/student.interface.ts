import { AttendanceType } from "./attendance.interface";
import { AgeGroupType } from "./class.interface";
import { ParentType } from "./parent.interface";
import { NewTransactionPackageType, TransactionPackageType } from "./transaction.interface";

export interface StudentType {
  _id?: string;
  name: string;
  profileURL?: string;
  age: number;
  gradeLevel: AgeGroupType;
  parent: ParentType;
  classSchedule: AttendanceType[];
  // package?: TransactionPackageType;
  package?: NewTransactionPackageType;
  status: StudentStatus;
  stripe_customer_id?: string;

}

export type StudentStatus = "Paid" | "Not Paid" | "Enrolling";
