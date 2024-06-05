import KakaoMapComponent from "../map/KakaoMapComponent";
import "../../css/TripPlanAdd.css";

const MapComponent = ({map}) => {

	const result = {map}
	
	return (
		<>
			<div className="container-noline font-['Pretendard']">
				<div className="page-header">
					<h1>지도</h1>
				</div>	
				<div></div>
				<KakaoMapComponent width="1200px" height="600px" result={result} />
			</div>
		</>
	);
};

export default MapComponent;
