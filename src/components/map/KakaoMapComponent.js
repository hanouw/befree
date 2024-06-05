import React, { useEffect, useRef } from "react";

const { kakao } = window;

const KakaoMapComponent = ({ width = "100%", height = "100%", map = [] }) => {
	const mapContainer = useRef(null);

	const mapScript = () => {
		const container = mapContainer.current; // useRef를 통해 DOM 레퍼런스 얻기
		const options = {
			center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974), // 지도의 중심좌표
			level: 10, // 지도의 레벨(확대, 축소 정도)
		};
		const mapInstance = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

		if (Array.isArray(map) && map.length > 0) {
			map.forEach((el) => {
				// 마커를 생성합니다
				new kakao.maps.Marker({
					//마커가 표시 될 지도
					map: mapInstance,
					//마커가 표시 될 위치
					position: new kakao.maps.LatLng(el.mapy, el.mapx),
					//마커에 hover시 나타날 title
					title: el.title,
				});
			});
		}
	};

	useEffect(() => {
		mapScript();
	}, [map]);

	return (
		<div className="container-noline font-['Pretendard']">
			<div ref={mapContainer} style={{ width, height }}></div>
		</div>
	);
};

export default KakaoMapComponent;
