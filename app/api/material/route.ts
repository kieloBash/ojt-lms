import Material from "@/lib/models/material.model";
import connectDB from "@/lib/mongodb";
import { pageLimit } from "@/utils/constants/data/pagelimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectDB();
    const params = req.url.split("?");
    let page: number = 1;
    for (let i = 0; i < params.length; i++) {
      const param = params[i].split("=");
      if (param[0] === "page") {
        page = Number(param[1]);
        break;
      }
    }

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
  }
}
