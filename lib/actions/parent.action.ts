"use server";

import connectDB from "../mongodb";
import Parent from "../models/parent.model";
import Student from "../models/student.model";
import Classes from "../models/class.model";
import Transaction from "../models/transaction.model";
import { ParentType } from "../interfaces/parent.interface";
import { StudentType } from "../interfaces/student.interface";
import * as bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import Attendance from "../models/attendance.model";
import User from "../models/user.model";

async function isParentExists(email: string) {
  const existingParent = await Parent.findOne({ email }); // Assuming 'email' is a unique identifier
  const existingUser = await User.findOne({ email }); // Assuming 'email' is a unique identifier

  if (existingParent) return existingParent;
  if (existingUser) return existingUser;

  return false;
}

export async function createNewParent({
  newDataParent,
  newDataStudent,
  password,
}: {
  newDataParent: ParentType;
  newDataStudent: StudentType;
  password?: string;
}) {
  try {
    connectDB();

    const emailExists = await isParentExists(newDataParent.email);

    if (emailExists)
      return {
        message: "Account Email Already Exist in the Database",
        data: emailExists,
        success: false,
      };

    const saltRounds = 10;
    const defaultPassword = password || "1234";
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(defaultPassword, salt);
    const createdParent = await Parent.create({
      ...newDataParent,
      password: hashedPassword,
    });

    const createdStudent = await Student.create({
      ...newDataStudent,
      parent: createdParent._id,
    });

    // @ts-ignore
    const children: any[] = [...createdParent.children, createdStudent._id];

    // @ts-ignore
    await Parent.findByIdAndUpdate(createdParent._id, {
      children,
    });

    return {
      message: "Successfully Created New Parent",
      data: createdParent,
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Error creating new parent: ${error.message}`);
  }
}

export async function createNewStudent({
  parentId,
  newDataStudent,
}: {
  parentId: string;
  newDataStudent: StudentType;
}) {
  try {
    connectDB();

    const selectedParent = await Parent.findById(parentId);

    const createdStudent = await Student.create({
      ...newDataStudent,
      parent: selectedParent._id,
    });

    // @ts-ignore
    const children: any[] = [...selectedParent.children, createdStudent._id];

    // @ts-ignore
    await Parent.findByIdAndUpdate(selectedParent._id, {
      children,
    });
    revalidatePath("/dashboard");

    return {
      message: "Successfully Created New Parent",
      data: selectedParent,
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Error creating new parent: ${error.message}`);
  }
}

export async function fetchSingleParentId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Parent.findById({ _id })
      .lean()
      .select("_id name email profileURL isAccepted")
      .populate({
        path: "children",
        model: Student,
        select: "_id name age status profileURL package gradeLevel",
        // populate: {
        //   path: "enrolledClass",
        //   model: Classes,
        //   select: "class",
        // },
      })
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Parent not Found");
    }

    const plainData = {
      ...single,
      _id: single._id.toString(),
      children: single.children.map((child: any) => {
        if (child.enrolledClass)
          return {
            ...child,
            _id: child._id.toString(),
            enrolledClass: {
              ...child.enrolledClass,
              _id: child.enrolledClass._id.toString(),
            },
          };
        else {
          return {
            ...child,
            _id: child._id.toString(),
          };
        }
      }),
    };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}

export async function fetchSingleChildId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Student.findById({ _id })
      .lean()
      .select("_id name age status profileURL package gradeLevel")
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Student not Found");
    }

    const plainData = {
      ...single,
      _id: single._id.toString(),
    };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Student`);
  }
}

export async function fetchChildrenId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Parent.findById({ _id })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .populate({
        path: "children",
        model: Student,
        select: "_id name age status profileURL",
        populate: {
          path: "enrolledClass",
          model: Classes,
          select: "class",
        },
      })
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Parent not Found");
    }

    const plainData = {
      ...single,
      _id: single._id.toString(),
      children: single.children.map((child: any) => {
        return { ...child, _id: child._id.toString() };
      }),
    };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}

export async function fetchTransactionId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Parent.findById({ _id })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .populate({
        path: "transactions",
        model: Transaction,
        select: "_id price package status createdAt",
        populate: [
          {
            path: "student",
            model: Student,
            select: "_id name age",
          },
          {
            path: "classSchedule",
            model: Attendance,
            select: "_id date ageGroup startTime endTime",
          },
        ],
      })
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Parent not Found");
    }

    const plainData = {
      transactions: single.transactions.map((transaction: any) => {
        return {
          ...transaction,
          _id: transaction._id.toString(),
        };
      }),
    };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}
