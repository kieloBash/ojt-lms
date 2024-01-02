"use server";

import connectDB from "../mongodb";
import Classes from "../models/class.model";
import { ClassesType } from "../interfaces/class.interface";
import Student from "../models/student.model";
import Parent from "../models/parent.model";
import { StudentType } from "../interfaces/student.interface";

export async function fetchAllClasses(
  pageNumber = 1,
  pageSize = 10,
  search = "",
  levelFilter = "all"
) {
  try {
    connectDB();

    // const filter = levelFilter === "all" ? {} : { ageGroup: levelFilter };
    const filter =
      search !== ""
        ? levelFilter === "all"
          ? { class: new RegExp(search, "i") }
          : { ageGroup: levelFilter, class: new RegExp(search, "i") }
        : levelFilter === "all"
        ? {}
        : { ageGroup: levelFilter };

    const skipAmount = (pageNumber - 1) * pageSize;
    const findQuery = search !== "" ? { class: new RegExp(search, "i") } : {}; // Case-insensitive search
    // fetch Top Level threads
    const postQuery = Classes.find(filter)
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select(
        "_id class zoomLink price ageGroup classDate startTime endTime repeatedDays"
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

    const totalCount = await Classes.countDocuments(filter);
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
    const isNext = totalCount > skipAmount + data.length;

    return { classes: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function fetchSingleClassByID({ _id }: { _id: string }) {
  try {
    connectDB();

    const postQuery = Classes.findById(_id)
      .sort({
        createdAt: "desc",
      })
      .select(
        "_id class zoomLink price ageGroup classDate startTime endTime repeatedDays"
      )
      .populate({
        path: "participants",
        model: Student,
        select: "_id name age profileURL classExpiryDate",
        populate: [
          {
            path: "parent",
            model: Parent,
            select: "_id name email",
          },
        ],
      })
      .lean()
      .exec();

    const d: any = await postQuery;

    const plainData: any = {
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

    return plainData as ClassesType;
  } catch (error: any) {
    throw new Error("Error in fetching single class", error.message);
  }
}

export async function updateSingleClassLinkByID({
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

export async function fetchAllClassesSelection(gradeLevel: string[]) {
  try {
    connectDB();

    const postQuery = Classes.find({ ageGroup: { $in: gradeLevel } })
      .sort({
        createdAt: "desc",
      })
      .lean()
      .select("_id class ageGroup")
      // .populate({
      //   path: "participants",
      //   model: Student,
      //   select: "_id name",
      // })
      .exec();

    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    return { classes: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function fetchRelatedClasses(
  gradeLevel: string[],
  classId: string
) {
  try {
    connectDB();

    const postQuery = Classes.find({
      ageGroup: { $in: gradeLevel },
      _id: { $ne: classId },
    })
      .sort({
        createdAt: "desc",
      })
      .lean()
      .select(
        "_id class ageGroup startTime endTime image repeatedDays participants"
      )
      .exec();

    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        participants: d.participants.map((single: any) => {
          return { ...single, _id: single._id.toString() };
        }),
      };
    });

    return { classes: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function fetchForYouClasses(childId: string) {
  try {
    connectDB();

    const selectedStudent: StudentType = (await Student.findById(childId)
      .lean()
      .select("_id age gradeLevel")
      .exec()) as StudentType;

    const postQuery = Classes.find({ ageGroup: selectedStudent.gradeLevel })
      .sort({
        createdAt: "desc",
      })
      .lean()
      .select("_id class day ageGroup image startTime endTime")
      // .populate({
      //   path: "participants",
      //   model: Student,
      //   select: "_id name",
      // })
      .exec();

    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    return { classes: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function searchClass(searchQuery: string) {
  try {
    connectDB();

    const query = Classes.find({
      class: { $regex: new RegExp(searchQuery, "i") },
    })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id class ageGroup zoomLink")
      // .populate({ path: "enrolledClass", model: Classes, select: "_id class" })
      .exec();

    const data = await query;

    // Convert _id to string in the results
    const arrToIdString: any[] = data.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      // enrolledClass: {
      //   ...d.enrolledClass,
      //   _id: d.enrolledClass._id.toString(),
      // },
    }));

    return arrToIdString;
  } catch (error: any) {
    throw new Error("Error in fetching classes", error.message);
  }
}
