"use client";

import { fetchMaterials } from "@/lib/actions/materials.action";
import { useQuery } from "@tanstack/react-query";

const useMaterials = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`materials`],
    queryFn: async () => {
      const { materials } = await fetchMaterials();

      console.log(materials);
      return materials;
    },
  });
  return { data, isLoading };
};

export default useMaterials;
