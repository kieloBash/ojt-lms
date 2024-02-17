"use client";
import React, { useState } from "react";
import useFetchCourses from "./hooks/useFetchCourses";
import { Loader2 } from "lucide-react";
import { FullCourseCard } from "./cards/full-course";
import { UpdateLinkModal } from "./modal/update-link";
import { ClassesType } from "@/lib/interfaces/class.interface";

const CoursesClient = () => {
  const { data: courses, isLoading } = useFetchCourses();

  //
  const [selected, setSelected] = useState<ClassesType>();
  const [openUpdateLink, setOpenUpdateLink] = useState(false);

  if (isLoading) return <Loader2 className="w-6 h-6 animate-spin" />;

  return (
    <>
      {openUpdateLink && selected !== undefined && (
        <UpdateLinkModal
          selected={selected}
          open={openUpdateLink}
          handleClose={() => {
            setSelected(undefined);
            setOpenUpdateLink(false);
          }}
          setOpen={(e) => {
            setOpenUpdateLink(e);
          }}
        />
      )}
      <div className="flex flex-wrap flex-1 gap-4 px-10">
        {Object.keys(courses).map((ageGroup, index) => {
          return (
            <FullCourseCard
              key={index}
              level={ageGroup}
              timeslots={courses[ageGroup]}
              handleSelected={(e: ClassesType) => {
                setOpenUpdateLink(true);
                setSelected(e);
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default CoursesClient;
