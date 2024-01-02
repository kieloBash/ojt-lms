"use server";

import connectDB from "../mongodb";
import { AgeGroupType } from "../interfaces/class.interface";
import Attendance from "../models/attendance.model";
import Material from "../models/material.model";
import Classes from "../models/class.model";

export async function fetchMaterials(pageNumber = 1, pageSize = 20) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const query = Material.find({})
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id filename url gradeLevel type createdAt available")
      .populate({
        path: "attendance",
        select: "_id date",
        model: Attendance,
        populate: {
          path: "class",
          select: "_id class",
          model: Classes,
        },
      })
      .exec();

    const totalCount = await Material.countDocuments({});
    const data = await query;

    const plainData: any[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        attendance: d.attendance
          ? {
              ...d.attendance,
              _id: d.attendance._id?.toString(),
              class: d.attendance.class
                ? {
                    ...d.attendance.class,
                    _id: d.attendance.class._id?.toString(),
                  }
                : undefined,
            }
          : undefined,
      };
    });
    console.log(plainData);

    const isNext = totalCount > skipAmount + plainData.length;

    return { materials: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching materials", error.message);
  }
}

export async function createNewMaterial({
  attendanceId,
  filename,
  url,
  gradeLevel,
  type,
}: {
  attendanceId: string;
  filename: string;
  url: string;
  gradeLevel: string[];
  type: string;
}) {
  try {
    connectDB();

    // const attendance = await Attendance.findById(attendanceId).exec();
    // console.log(attendance);

    let label;

    if (type === "application/pdf") {
      label = "PDF";
    } else if (
      type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      type === "text/csv"
    ) {
      label = "CSV";
    } else if (
      type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      ""
    ) {
      label = "DOCX";
    } else {
      if (type.startsWith("image/")) {
        label = "Image";
      } else if (type.startsWith("video/")) {
        label = "Video";
      } else {
        // Use the original fileType as label if no specific mapping is defined
        label = type;
      }
    }

    console.log(label);

    const newMaterial = await Material.create({
      filename,
      url,
      gradeLevel,
      type: label,
    });

    if (!newMaterial) throw new Error(`Error creating new material`);

    return true;
  } catch (error: any) {
    throw new Error(`Error creating new material: ${error.message}`);
  }
}

export async function deleteMaterial({ id }: { id: string }) {
  try {
    connectDB();

    const deleted = await Material.findByIdAndDelete(id).exec();

    if (!deleted) throw new Error("Error in deleting materials");

    return true;
  } catch (error: any) {
    throw new Error("Error in deleting materials", error.message);
  }
}
export async function updateStatus({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) {
  try {
    connectDB();
    const available = status ? false : true;

    const updated = await Material.findByIdAndUpdate(id, { available }).exec();

    if (!updated) throw new Error("Error in updating status of materials");

    return true;
  } catch (error: any) {
    throw new Error("Error in updating status of materials", error.message);
  }
}

export async function updateGradeLevels({
  id,
  gradeLevel,
}: {
  id: string;
  gradeLevel: string[];
}) {
  try {
    connectDB();

    const updated = await Material.findByIdAndUpdate(id, { gradeLevel }).exec();

    if (!updated) throw new Error("Error in updating grade level of materials");

    return true;
  } catch (error: any) {
    throw new Error(
      "Error in updating grade level of materials",
      error.message
    );
  }
}

export async function updateAttendanceConnection({
  materialId,
  attendanceId,
}: {
  materialId: string;
  attendanceId: string;
}) {
  try {
    connectDB();

    const newAttendance = await Attendance.findByIdAndUpdate(attendanceId, {
      $push: { materials: materialId },
    });
    const updated = await Material.findByIdAndUpdate(materialId, {
      attendance: attendanceId,
    }).exec();

    console.log(newAttendance);
    console.log(updated);

    if (!newAttendance || !updated)
      throw new Error("Error in updating attendance of materials");

    return true;
  } catch (error: any) {
    throw new Error(
      "Error in updating attendancel of materials",
      error.message
    );
  }
}
