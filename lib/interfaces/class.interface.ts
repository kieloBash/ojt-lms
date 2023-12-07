import { StudentType } from "./student.interface";

export interface ClassesType {
  _id?: string;
  class: string;
  startTime: string;
  endTime: string;
  day: string;
  image: string;
  color?: ColorType | string;
  ageGroup: AgeGroupType;
  zoomLink: string;
  participants: StudentType[];
}

export type SubscriptionPlansType = {
  plan: PlansType;
  price: number;
};
export type AgeGroupType = "N1" | "N2" | "K1" | "K2";
export type PlansType = "1 Month" | "2 Month" | "3 Month";
export type ColorType = "blue" | "red" | "green" | "orange";
