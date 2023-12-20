"use server";

import connectDB from "../mongodb";
import { AgeGroupType } from "../interfaces/class.interface";
import Attendance from "../models/attendance.model";
import Material from "../models/material.model";

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
      .select("_id filename url gradeLevel type createdAt")
      .exec();

    const totalCount = await Material.countDocuments({});
    const data = await query;

    const plainData: any[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

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
