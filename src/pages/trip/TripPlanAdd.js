import React from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import HeaderComponent from "../../components/tripPlanAdd/HeaderComponent";
import MapComponent from "../../components/tripPlanAdd/MapComponent";
import FoundListComponent from "../../components/tripPlanAdd/FoundListComponent"
import KakaoMapComponent from "../../components/map/KakaoMapComponent";

// 여행 계획 추가
const TripPlanAdd = () => {
	return (
		<div>
			<HeaderComponent />
			<FilterComponent />
			<KakaoMapComponent />
			<FoundListComponent />
		</div>
	);
};

export default TripPlanAdd;
