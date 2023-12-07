"use client";
import { fetchSingleChildId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { isParent } from "@/utils/helpers/isParent";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useContext } from "react";

const SelectedChildContext = createContext<{
  selectedChild: StudentType | undefined;
  setSelectedChild: (sel: StudentType) => void;
}>({
  selectedChild: undefined,
  setSelectedChild: () => {},
});

export const SelectedChildProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedChild, setSelectedChild] = useState<StudentType | undefined>();

  const { data: session } = useSession();
  const userInfo = session?.user as ParentType;

  async function fetchStudent(_id: string) {
    const student = await fetchSingleChildId({ _id });
    setSelectedChild(student);
  }

  React.useEffect(() => {
    if (userInfo && userInfo.children && !selectedChild) {
      fetchStudent(userInfo.children[0]._id as string);
    }
  }, [userInfo]);

  console.log(selectedChild);

  return (
    <SelectedChildContext.Provider
      value={{
        selectedChild,
        setSelectedChild,
      }}
    >
      {children}
    </SelectedChildContext.Provider>
  );
};

export const useSelectedChild = () => useContext(SelectedChildContext);
