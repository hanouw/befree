import React from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import HeaderComponent from "../../components/tripPlanAdd/HeaderComponent";
import MapComponent from "../../components/tripPlanAdd/MapComponent";
import FoundListComponent from "../../components/tripPlanAdd/FoundListComponent"

// 여행 계획 추가
const TripPlanAdd = () => {
	return (
		<div>
			<HeaderComponent />
			<FilterComponent />
			<MapComponent />
			<FoundListComponent />
		</div>
	);
};

export default TripPlanAdd;
