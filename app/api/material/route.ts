import Material from "@/lib/models/material.model";
import connectDB from "@/lib/mongodb";
import { pageLimit } from "@/utils/constants/data/pagelimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectDB();
    let page: number = 1;

    const limit = pageLimit;
    const skip = (page - 1) * limit;

    const materials = await Material.find({})
      .limit(limit)
      .skip(skip)
      .select("_id filename url gradeLevel type createdAt available")
      .exec();

    const total = await Material.countDocuments({});

    return NextResponse.json({ data: materials, total });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: [], total: 0 });
  }
}
