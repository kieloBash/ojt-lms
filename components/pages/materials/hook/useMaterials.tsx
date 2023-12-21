"use client";

import { fetchMaterials } from "@/lib/actions/materials.action";
import { useQuery } from "@tanstack/react-query";

const useMaterials = (page: number) => {
  const getMaterials = async () => {
    const res = await fetch(`/api/material?page=${page}`);
    const { data, total } = await res.json();
    // console.log(total);
    const formatted = data.map((d: any) => {
      return {
        ...d,
        createdAt: new Date(d.createdAt),
      };
    });
    return { data: formatted, total };
  };

  const { data, isLoading } = useQuery({
    queryKey: [`materials`, page],
    queryFn: async () => {
      const { materials, totalCount } = await fetchMaterials();
      // const data = await getMaterials();
      console.log(materials);
      return { data: materials, total: totalCount };
    },
  });
  const items = data?.data || [];
  const total = data?.total || 0;

  return { data: items, isLoading, total };
};

export default useMaterials;
