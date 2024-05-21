import React, { useState } from "react";
import MainComponents from "../components/main/MainComponents";

const ListPage = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <MainComponents />
      </div>
    </div>
  );
};

export default ListPage;
