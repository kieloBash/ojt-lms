"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useFetchFirebase from "./hook/useFirebase";
import { Loader2 } from "lucide-react";
import useMaterials from "./hook/useMaterials";
import { useSearchParams } from "next/navigation";
import { MaterialsProvider } from "./context/useSelectedChild";
import { ConnectAttendanceModal } from "./modals/connect-attendance";

const MaterialsMain = () => {
  const files = useFetchFirebase();

  const params = useSearchParams();
  const page = params.get("page") ? params.get("page") : 1;

  const materials = useMaterials(Number(page));

  if (files.isLoading || materials.isLoading)
    return (
      <article className="flex items-center justify-center flex-1 px-10">
        <Loader2 className="w-6 h-6 animate-spin" />
      </article>
    );

  return (
    <article className="flex-1 px-10">
      <MaterialsProvider>
        <ConnectAttendanceModal />
        <DataTable
          data={materials?.data || []}
          columns={columns}
          total={materials?.total || 0}
        />
      </MaterialsProvider>
    </article>
  );
};

export default MaterialsMain;
