import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import tripListComponent from "../../components/tripList/tripListComponent";
import tripAddModalComponent from "../../components/tripList/tripAddModalComponent";

// 여행 계획 목록
const TripList = () => {
  return (
    <>
      <BasicLayout>
        <tripListComponent />
        <tripListModalComponent />
      </BasicLayout>
    </>
  );
};

export default TripList;
