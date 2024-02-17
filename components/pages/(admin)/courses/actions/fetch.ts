"use server";

import { ClassesType } from "@/lib/interfaces/class.interface";
import Classes from "@/lib/models/class.model";
import Parent from "@/lib/models/parent.model";
import Student from "@/lib/models/student.model";
import connectDB from "@/lib/mongodb";

export async function fetchAllClassesLevels(levelFilter = "all") {
  try {
    connectDB();

    const filter = levelFilter === "all" ? {} : { ageGroup: levelFilter };

    // fetch Top Level threads
    const postQuery = Classes.find(filter)
      .sort({
        createdAt: "desc",
      })
      .lean()
      .select(
        "_id class zoomLink ageGroup day startTime endTime"
      )
      .populate({
        path: "participants",
        model: Student,
        select: "_id name age",
        populate: {
          path: "parent",
          model: Parent,
          select: "_id name email phone",
        },
      })
      .exec();

    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        participants: d.participants?.map((participant: any) => {
          return {
            ...participant,
            _id: participant._id?.toString(),
            parent: {
              ...participant.parent,
              _id: participant.parent._id?.toString(),
            },
          };
        }),
      };
    });

    return { classes: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching courses", error.message);
  }
}
