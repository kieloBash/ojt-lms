"use client";
import useFetchTemp from "@/components/hooks/getTemp";
import { Loader2 } from "lucide-react";
import React from "react";

const Temp = () => {
  const temp = useFetchTemp();
  return (
    <ul className="">
      {temp.isLoading ? (
        <div>
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>
          {temp.data?.map((s) => {
            return (
              <li key={s._id as string} className="">
                {s.email}
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};

export default Temp;
