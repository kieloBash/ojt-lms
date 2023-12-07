import { AttendanceType } from "./attendance.interface";
import { ClassesType } from "./class.interface";

export interface MaterialType {
  _id?: string;
  attendance: AttendanceType;
  //attendanceId: string;
  filename: string;
  materials: string;
  classDate: Date;
  addedDate: Date;
  type: string;
}

