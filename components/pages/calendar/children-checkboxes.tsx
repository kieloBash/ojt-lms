"use client";
import React from "react";

// BACKEND
import { useQuery } from "@tanstack/react-query";

// UI
import { Checkbox } from "@/components/ui/checkbox";
import { fetchChildrenId } from "@/lib/actions/parent.action";
import { StudentType } from "@/lib/interfaces/student.interface";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import useUserInfo from "@/components/hooks/useUserInfo";
import useGetUserInfo from "@/components/hooks/useGetUserInfo";

const children = [
  {
    id: "123",
    label: "Stand",
  },
  {
    id: "1234",
    label: "Juan",
  },
] as const;

const ChildrenCheckboxes = () => {
  // const userInfo = useUserInfo();

  const { data: userInfo } = useGetUserInfo();
  const userId = userInfo?._id as string;

  const { data, isLoading } = useQuery({
    queryKey: [`children`],
    queryFn: async () => {
      const parent = await fetchChildrenId({ _id: userId });
      return parent;
    },
  });
  return (
    <ul className="flex flex-col w-full gap-2">
      {isLoading ? (
        <></>
      ) : (
        <>
          {data.children.map((child: StudentType, index: number) => {
            return (
              <li className="flex w-full gap-2" key={index}>
                <Checkbox onCheckedChange={(checked) => {}} />
                <span className="">{child.name}</span>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};

export default ChildrenCheckboxes;
