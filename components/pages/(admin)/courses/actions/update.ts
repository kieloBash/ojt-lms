"use server";

import { ClassesType } from "@/lib/interfaces/class.interface";
import Classes from "@/lib/models/class.model";
import Parent from "@/lib/models/parent.model";
import Student from "@/lib/models/student.model";
import connectDB from "@/lib/mongodb";

export async function updateClassLink({
  _id,
  zoomLink,
}: {
  _id: string;
  zoomLink: string;
}) {
  try {
    connectDB();

    console.log(_id, zoomLink);
    const d = await Classes.findByIdAndUpdate(_id, { zoomLink }).exec();
    console.log(d);
    if (!d) return false;

    return true;
  } catch (error: any) {
    throw new Error("Error in fetching single class", error.message);
  }
}
