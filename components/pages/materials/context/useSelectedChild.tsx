"use client";
import React, { createContext, useState, useContext } from "react";

export type MaterialsType = {
  _id: string;
  filename: string;
  url: string;
  type: string;
  available: boolean;
  classDate?: Date | undefined;
  gradeLevel?: string[] | undefined;
  createdAt?: Date | undefined;
};

const MaterialsContext = createContext<{
  toggleEdit: boolean;
  setToggleEdit: (sel: boolean) => void;
  selected: MaterialsType | undefined;
  setSelected: (sel: MaterialsType) => void;
}>({
  toggleEdit: false,
  setToggleEdit: (sel: boolean) => {},
  selected: undefined,
  setSelected: (sel: MaterialsType) => {},
});

export const MaterialsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [selected, setSelected] = useState<MaterialsType>();

  return (
    <MaterialsContext.Provider
      value={{
        toggleEdit,
        setToggleEdit,
        selected,
        setSelected,
      }}
    >
      {children}
    </MaterialsContext.Provider>
  );
};

export const useMaterialsContext = () => useContext(MaterialsContext);
