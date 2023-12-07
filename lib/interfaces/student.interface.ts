import { AttendanceType } from "./attendance.interface";
import { AgeGroupType } from "./class.interface";
import { ParentType } from "./parent.interface";
import { TransactionPackageType } from "./transaction.interface";

export interface StudentType {
  _id?: string;
  name: string;
  profileURL?: string;
  age: number;
  gradeLevel: AgeGroupType;
  parent: ParentType;
  classSchedule: AttendanceType[];
  package?: TransactionPackageType;
  status: StudentStatus;
}

export type StudentStatus = "Paid" | "Not Paid" | "Enrolling";
