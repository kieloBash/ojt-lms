import CoursesClient from "@/components/pages/(admin)/courses/client";
import React from "react";

const CoursesPage = () => {
  return (
    <main className="relative flex flex-1 w-full h-full bg-white">
      <article className="flex items-start justify-start flex-1">
        <section className="flex flex-col flex-1">
          <div className="flex items-center justify-between w-full p-10 py-5">
            <h2 className="text-3xl font-bold tracking-tight text-main-500">
              Courses
            </h2>
          </div>
          <CoursesClient />
        </section>
      </article>
    </main>
  );
};

export default CoursesPage;
