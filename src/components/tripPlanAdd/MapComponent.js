import KakaoMapComponent from "../map/KakaoMapComponent";
import "../../css/TripPlanAdd.css";

const MapComponent = () => {

	const list = [
		{ID:1,NAME:"A"}
	]
	
	return (
		<>
			<div className="container-noline font-['Pretendard']">
				<div className="page-header">
					<h1>지도</h1>
				</div>	
				<div></div>
				<KakaoMapComponent width="1200px" height="600px" list={list} />
			</div>
		</>
	);
};

export default MapComponent;
