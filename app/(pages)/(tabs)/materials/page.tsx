import MaterialsMain from "@/components/pages/materials/main";
import { AddMaterialModal } from "@/components/pages/materials/modals/add-material";
import React from "react";

const MaterialsPage = () => {
  return (
    <section className="flex flex-col flex-1">
      <div className="flex items-center justify-between w-full p-10 py-5">
        <h2 className="text-3xl font-bold tracking-tight text-main-500">
          Materials
        </h2>
        <AddMaterialModal />
      </div>
      <MaterialsMain />
    </section>
  );
};

export default MaterialsPage;
