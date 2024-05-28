import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const TripIndex = () => {
  return (
    <BasicLayout>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </BasicLayout>
  );
};

export default TripIndex;
