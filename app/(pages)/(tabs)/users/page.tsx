import React from "react";

const UsersPage = () => {
  return (
    <section className="flex flex-col flex-1 w-full min-h-screen bg-white">
      <div className="flex items-center justify-between w-full px-4 py-5 lg:px-10">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-main-500">
            Users
          </h2>
          <p className="text-sm text-muted-foreground">
            {`Here you can view all the list of users/parents enrolled in the LMS`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
