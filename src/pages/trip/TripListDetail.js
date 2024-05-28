import React from "react";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";

// 여행 계획 상세
const TripListDetail = () => {
  return (
    <div className="h-full">
      <KakaoMapComponent width="600px" height="400px" />
    </div>
  );
};

export default TripListDetail;