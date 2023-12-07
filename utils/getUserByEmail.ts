import { UserRolesType } from "@/lib/interfaces/user.interface";
import Parent from "@/lib/models/parent.model";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";

export async function getUserByEmail({
  email,
}: {
  email: string | undefined | null;
}) {
  console.log(email);
  try {
    connectDB();

    const user = await User.findOne({ email });
    const userparent = await Parent.findOne({ email });
    //  const userparent = false;

    if (!user && !userparent) {
      console.log("No email found");
      throw new Error("Email does not exist!");
    }

    if (user && !userparent && user.role === "teacher") {
      console.log("User is Teacher");

      const info = {
        _id: user._id.toString(),
        name: user._doc.name,
        email: user._doc.email,
        role: user._doc.role,
      };
      return info;
    } else if (!user && userparent) {
      console.log("User is Parent");
      const info = {
        _id: userparent._id.toString(),
        name: userparent._doc.name,
        email: userparent._doc.email,
        children: userparent?.children.map((s: any) => {
          return { ...s, _id: s._id.toString() };
        }),
        transactions: userparent?.transactions.map((s: any) => {
          return { ...s, _id: s._id.toString() };
        }),
      };
      return info;
    }
    
  } catch (error: any) {
    throw new Error(`Error getting User by Email: ${error.message}`);
  }
}

export async function authUser({
  email,
  password,
  role = "no role",
}: {
  email: string;
  password: string;
  role?: UserRolesType;
}) {
  try {
    connectDB();

    const user = await User.findOne({ email });
    const userparent = await Parent.findOne({ email });
    // const userparent = false;
    if (!user && !userparent) {
      console.log("No email found");
      throw new Error("Email does not exist!");
    } else if (!user) {
      console.log("User is parent");
      return {
        ...userparent._doc,
        _id: userparent._id.toString(),
        children: userparent?.children.map((s: any) => {
          return { ...s, _id: s._id.toString() };
        }),
      };
    } else if (user) {
      console.log("User is not parent");
      return { ...user._doc, _id: user._id.toString() };
    }
  } catch (error: any) {
    throw new Error(`Error getting User by Email: ${error.message}`);
  }
}
