import React, { useEffect, useRef } from "react";

const { kakao } = window;

const KakaoMapComponent = ({ width = "100%", height = "100%" }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const container = mapContainer.current; // useRef를 통해 DOM 레퍼런스 얻기
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div ref={mapContainer} style={{ width, height }}></div>
  );
};

export default KakaoMapComponent;