"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useFetchFirebase from "./hook/useFirebase";
import { Loader2 } from "lucide-react";
import useMaterials from "./hook/useMaterials";

const MaterialsMain = () => {
  const files = useFetchFirebase();
  const materials = useMaterials();
  console.log(materials);

  if (files.isLoading || materials.isLoading)
    return (
      <article className="flex items-center justify-center flex-1 px-10">
        <Loader2 className="w-6 h-6 animate-spin" />
      </article>
    );

  return (
    <article className="flex-1 px-10">
      <DataTable data={materials?.data || []} columns={columns} />
    </article>
  );
};

export default MaterialsMain;
