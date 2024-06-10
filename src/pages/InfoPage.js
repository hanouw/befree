import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { disableData } from "../api/tripApi";

const InfoPage = () => {
  const a = [[], [1, 2]];
  return (
    <BasicLayout>
      <div className="grid place-items-center text-3xl m-9">InfoPage</div>
      <div className="hover:cursor-pointer grid place-items-center">
        {a[0][0] ? <div>True</div> : <div>False</div>}
        {a[1][0] ? <div>True</div> : <div>False</div>}
      </div>
    </BasicLayout>
  );
};

export default InfoPage;
