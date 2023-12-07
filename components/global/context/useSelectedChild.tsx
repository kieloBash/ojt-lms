"use client";
import { fetchSingleChildId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useContext } from "react";

const SelectedChildContext = createContext<{
  selectedChild: StudentType | undefined;
  setSelectedChild: (sel: StudentType) => void;
}>({
  selectedChild: undefined,
  setSelectedChild: (sel: StudentType) => {},
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
    console.log(student);
    setSelectedChild(student);
  }

  React.useEffect(() => {
    if (userInfo && userInfo.children && !selectedChild) {
      fetchStudent(userInfo.children[0]._id as string);
    }
  }, [userInfo, selectedChild]);

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
