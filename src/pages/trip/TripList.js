import React from "react";
import TripListComponent from "../../components/tripList/TripListComponent";
import TripAddModalComponent from "../../components/tripList/TripAddModalComponent";

// 여행 계획 목록
const TripList = () => {
  return (
    <>
      <TripListComponent />
      <TripAddModalComponent />
    </>
  );
};

export default TripList;
