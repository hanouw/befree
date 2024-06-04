import React, { useEffect } from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import MapComponent from "../../components/tripPlanAdd/MapComponent";
import FoundListComponent from "../../components/tripPlanAdd/FoundListComponent";
import { useLocation } from "react-router-dom";
import { placeKeywordData } from "../../api/tripApi";

// 여행 계획 추가
const TripPlanAdd = () => {
	const map = [];

	const callBackFn = () => {
		console.log("callBackFn 실행됨");
		placeKeywordData().then((data) => {
			map.length = 0;
			console.log("placeKeywordData 실행됨");
			let result = data.response.body.items.item;
			for (let i = 0; i < result.length; i++) {
				const item = result[i];
				const mapObj = {
					mapx: item.mapx,
					mapy: item.mapy,
					title: item.title,
				};
				map.push(mapObj);
			}
			console.log(map);
		});
	};

	const location = useLocation();

	const tid = { ...location.state }.tid;
	const title = { ...location.state }.title;
	const date = { ...location.state }.date;
	const region = { ...location.state }.region;
	return (
		<div>
			<TripTopBannerComponent
				topText={"여행지 추가하기"}
				tid={tid}
				title={title}
				date={date}
			/>
			<TripAddSelectedComponent />
			<FilterComponent region={region} callBackFn={callBackFn} />
			<MapComponent list={map} />
			<FoundListComponent region={region} />
		</div>
	);
};

export default TripPlanAdd;
