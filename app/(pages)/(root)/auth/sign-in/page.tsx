import { UserType } from "@/lib/interfaces/user.interface";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";
import React from "react";

async function fetchUsers(pageNumber = 1, pageSize = 20) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const query = User.find({})
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id name email image role")
      .exec();

    const totalCount = await User.countDocuments({});
    const data = await query;

    const plainData: UserType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    const isNext = totalCount > skipAmount + plainData.length;

    return { users: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching users", error.message);
  }
}
const SignInPage = async () => {
  const { users } = await fetchUsers();
  return (
    <main className="">
      <ul className="">
        {users.map((s) => {
          return <li className="">{s.email}</li>;
        })}
      </ul>
    </main>
  );
};

export default SignInPage;
