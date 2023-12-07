import { AgeGroupType } from "@/lib/interfaces/class.interface";

export interface ClassCourseType {
  _id: string;
  class: string;
  startTime: string;
  endTime: string;
  day: string;
  image: string;
  color: "blue" | "red" | "green" | "orange";
  ageGroup: AgeGroupType;
  zoomLink: string;
  participants: [];
}

export const CLASS_COURSES: ClassCourseType[] = [
  {
    _id: "1",
    class: "PARROT",
    startTime: "08:30",
    endTime: "09:15",
    day: "Saturday",
    image: "",
    color: "blue",
    ageGroup: "N1",
    zoomLink: "",
    participants: [],
  },
  {
    _id: "2",
    class: "TURTLE",
    startTime: "13:55",
    endTime: "14:40",
    day: "Saturday",
    image: "",
    color: "red",
    ageGroup: "N1",
    zoomLink: "",
    participants: [],
  },
  {
    _id: "3",
    class: "HAMSTER",
    startTime: "08:30",
    endTime: "09:15",
    day: "Sunday",
    image: "",
    color: "green",
    ageGroup: "N1",
    zoomLink: "",
    participants: [],
  },
  {
    _id: "4",
    class: "PANDA",
    startTime: "16:40",
    endTime: "17:25",
    day: "Sunday",
    image: "",
    color: "orange",
    ageGroup: "N1",
    zoomLink: "",
    participants: [],
  },
  {
    _id: "5",
    class: "BEAR",
    startTime: "17:30",
    endTime: "18:15",
    day: "Monday",
    image: "",
    color: "red",
    ageGroup: "N1",
    zoomLink: "",
    participants: [],
  },
  {
    _id: "6",
    class: "CHICKEN",
    startTime: "18:30",
    endTime: "19:15",
    day: "Monday",
    image: "",
    color: "blue",
    ageGroup: "N1",
    zoomLink: "",
    participants: [],
  },
];
