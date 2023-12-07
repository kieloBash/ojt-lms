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

export async function fetchParentTransactions({
  pageNumber = 1,
  pageSize = 20,
  statusFilter = "All",
  transactionIds,
}: {
  pageNumber?: number;
  pageSize?: number;
  statusFilter?: "All" | "Pending";
  transactionIds: string[];
}) {
  try {
    connectDB();

    console.log(transactionIds);

    const skipAmount = (pageNumber - 1) * pageSize;

    const filter: any = { _id: { $in: transactionIds } };

    if (statusFilter !== "All") {
      filter.status = statusFilter;
    }

    const query = Transaction.find(filter)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id price status package createdAt paidAt")
      .populate({ path: "student", model: Student, select: "_id name" })
      // .populate({ path: "parent", model: Parent, select: "_id name" })
      .exec();

    const totalCount = await Transaction.countDocuments(filter);
    const transactions = await query;

    // Convert _id to string in the results
    const arrToIdString: TransactionsType[] = transactions.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      student: {
        ...d.student,
        _id: d.student._id.toString(),
      },
      // parent: {
      //   ...d.parent,
      //   _id: d.parent._id.toString(),
      // },
    }));

    const isNext = totalCount > skipAmount + transactions.length;

    return { transactions: arrToIdString, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching transactions", error.message);
  }
}
