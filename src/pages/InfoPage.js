import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { disableData } from "../api/tripApi";

const InfoPage = () => {
  return (
    <BasicLayout>
      <div className="grid place-items-center text-3xl m-9">InfoPage</div>
      <div className="hover:cursor-pointer grid place-items-center"></div>
    </BasicLayout>
  );
};

export default InfoPage;
