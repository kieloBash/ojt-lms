import { AgeGroupType, ClassesType } from "./class.interface";
import { StudentType } from "./student.interface";

export interface AttendanceType {
  _id?: string;
  class: ClassesType;
  date: Date;
  ageGroup: AgeGroupType;
  startTime: string;
  endTime: string;
  studentsPresent?: StudentType[];
  studentsNotPresent?: StudentType[];
  classParticipants?: StudentType[];
  link: string;
  materials: string[];
}

export type ClassAttendanceType = "regular" | "special";
export type ClassAttendanceStatus = "ongoing" | "pending" | "cancelled";
