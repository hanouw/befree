import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const TripIndex = () => {
  return (
    <BasicLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main>
          <Outlet />
        </main>
      </div>
    </BasicLayout>
  );
};

export default TripIndex;
