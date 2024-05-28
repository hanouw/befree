import KakaoMapComponent from "../map/KakaoMapComponent";

const MapComponent = () => {
	return (
		<>
			<div className="container-noline font-['Pretendard']">
				<div className="page-header">
					<h1>지도</h1>
				</div>
				<KakaoMapComponent width="1200px" height="600px" />
			</div>
		</>
	);
};

export default MapComponent;
