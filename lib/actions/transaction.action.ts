"use server";

import connectDB from "../mongodb";
import { TransactionsType } from "../interfaces/transaction.interface";
import Transaction from "../models/transaction.model";
import Classes from "../models/class.model";
import Parent from "../models/parent.model";
import Student from "../models/student.model";

export async function createNewTransactionSubscription({
  NewTransaction,
}: {
  NewTransaction: TransactionsType;
}) {
  try {
    connectDB();

    const createdTransaction = await Transaction.create({
      ...NewTransaction,
    });

    // Update Parent model
    await Parent.findByIdAndUpdate(NewTransaction.parent, {
      $push: { transactions: createdTransaction._id },
    });

    // Update Classes model
    await Student.findByIdAndUpdate(NewTransaction.student, {
      classSchedule: NewTransaction.classSchedule,
      status: "Not Paid",
      package: NewTransaction.package,
    });

    return {
      message: "Successfully Created New Transaction",
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Error creating new transaction: ${error.message}`);
  }
}

export async function fetchTransactions(
  pageNumber = 1,
  pageSize = 20,
  statusFilter = "All"
) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const filter = statusFilter === "All" ? {} : { status: statusFilter };
    const query = Transaction.find(filter)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id price duration status paidDate expiryDate")
      .populate({ path: "student", model: Student, select: "_id name age" })
      .populate({
        path: "class",
        model: Classes,
        select: "_id ageGroup classDate class",
      })
      .populate({
        path: "student",
        populate: {
          path: "parent",
          model: Parent,
          select: "_id name email",
        },
        model: Student,
      })
      .exec();

    const totalCount = await Transaction.countDocuments(filter);
    const transactions = await query;

    // // Convert _id to string in the results
    const arrToIdString: TransactionsType[] = transactions.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      class: { ...d.class, _id: d.class._id.toString() },
      student: {
        ...d.student,
        _id: d.student._id.toString(),
        parent: {
          ...d.student.parent,
          _id: d.student.parent._id.toString(),
        },
      },
    }));

    console.log(arrToIdString);

    const isNext = totalCount > skipAmount + transactions.length;

    return { transactions: arrToIdString, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching transactions", error.message);
  }
}