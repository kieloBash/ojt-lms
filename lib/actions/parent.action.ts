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
import { auth } from "@clerk/nextjs";
import { UserType } from "../interfaces/user.interface";

export async function authUserClerk() {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  let result: ParentType | UserType | undefined;

  result = await fetchSingleParentClerkId({ clerkId });
  if (!result) {
    result = await fetchSingleUserClerkId({ clerkId });
  }

  return result;
}

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

export async function updatePassword(userId: string, newPassword: string) {
  try {
    connectDB();

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const data = await Parent.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    return {
      message: "Password updated successfully",
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      message: "Error updating password",
      success: false,
    };
  }
}

export async function updateStripeId(
  userId: string,
  stripe_customer_id: string
) {
  try {
    connectDB();

    const data = await Parent.findByIdAndUpdate(userId, {
      stripe_customer_id,
    });

    return {
      message: "StripeId updated successfully",
      success: true,
      data,
    };
  } catch (error: any) {
    throw new Error(`Error updating password: ${error.message}`);
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
      .select(
        "_id name age status profileURL package gradeLevel stripe_customer_id"
      )
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Student not Found");
    }

    const plainData = {
      ...single,
      _id: single._id.toString(),
    };

    console.log(plainData);

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

export async function fetchSingleParentClerkId({
  clerkId,
}: {
  clerkId: string;
}) {
  try {
    connectDB();

    const single: any = await Parent.findOne({ clerkId })
      .lean()
      .select("_id name email profileURL isEnrolled clerkId stripe_customer_id")
      .populate({
        path: "children",
        model: Student,
        select:
          "_id name age status profileURL package gradeLevel stripe_customer_id",
      })
      .populate({
        path: "transactions",
        model: Transaction,
        select: "_id price",
      })
      .exec();

    console.log(single);

    if (!single) {
      const userInfo = await fetchSingleUserClerkId({ clerkId });
      // console.log(userInfo);
      return userInfo;
      // throw new Error(`Error in fetching single Parent`);
    }
    // console.log(single);

    const plainData: ParentType = {
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
    console.log(plainData);

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}

export async function fetchSingleUserClerkId({ clerkId }: { clerkId: string }) {
  try {
    connectDB();

    const single: any = await User.findOne({ clerkId })
      .lean()
      .select("_id name email image role isEnrolled")
      .exec();

    if (!single) {
      return;
      // throw new Error("User not Found");
    }

    const plainData: UserType = {
      ...single,
      _id: single._id?.toString(),
    };

    return plainData;
  } catch (error) {
    return;
    throw new Error(`Error in fetching single User`);
  }
}
