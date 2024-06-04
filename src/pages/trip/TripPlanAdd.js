import React from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import MapComponent from "../../components/tripPlanAdd/MapComponent";
import FoundListComponent from "../../components/tripPlanAdd/FoundListComponent";
import { useLocation } from "react-router-dom";

// 여행 계획 추가
const TripPlanAdd = () => {
  const location = useLocation();

  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;
  return (
    <div>
      <TripTopBannerComponent topText={"여행지 추가하기"} tid={tid} title={title} date={date} />
      <TripAddSelectedComponent />
      <FilterComponent region={region} />
      <MapComponent />
      <FoundListComponent region={region} />
    </div>
  );
};

export default TripPlanAdd;
