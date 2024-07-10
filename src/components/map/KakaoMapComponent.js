import React, { useEffect, useRef, useState } from "react";
import { mapData } from "../../util/mapData";

const { kakao } = window;

const TripListDetailKakaoMapComponent = (props) => {
  const { width = "100%", height = "100%", map = [], region } = props;
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const bounds = useRef(null);
  // 핀과 데이터 갱신 시 이전 데이터 삭제에 필요
  const markers = useRef([]);
  const polylines = useRef([]);
  const overlays = useRef([]);

  // 초기 지도 레벨 설정
  const [currentLevel, setCurrentLevel] = useState(6);

  const initializeMap = (center) => {
    const container = mapContainer.current;
    const options = {
      center,
      level: currentLevel,
    };
    mapInstance.current = new kakao.maps.Map(container, options);

    // 줌 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    mapInstance.current.addControl(
      zoomControl,
      kakao.maps.ControlPosition.RIGHT
    );

    updateMarkers();
  };

  // 기존 데이터 지우고 다시 그리기
  const clearMapElements = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    polylines.current.forEach((polyline) => polyline.setMap(null));
    overlays.current.forEach((overlay) => overlay.setMap(null));

    markers.current = [];
    polylines.current = [];
    overlays.current = [];
  };

  // 여기서 마커(핀) 전부 추가
  const updateMarkers = () => {
    clearMapElements();

    if (Array.isArray(map) && map.length > 0) {
      bounds.current = new kakao.maps.LatLngBounds();
      map.forEach((el, index) => {
        const position = new kakao.maps.LatLng(el.mapy, el.mapx);
        const marker = new kakao.maps.Marker({
          map: mapInstance.current,
          position: position,
          title: el.title,
        });

        markers.current.push(marker);
        bounds.current.extend(position);
      });
      mapInstance.current.setBounds(bounds.current);
    }
  };

  useEffect(() => {
    let center;
    if (map.length === 0 && region) {
      const result = mapData.find((data) => data.areaCode == region);
      if (result) {
        center = new kakao.maps.LatLng(result.mapy, result.mapx);
      } else {
        center = new kakao.maps.LatLng(37.554715, 126.970796); // Default to Seoul if no result
      }
    } else if (map.length > 0) {
      center = new kakao.maps.LatLng(map[0].mapy, map[0].mapx); // Center to the first map item
    } else {
      center = new kakao.maps.LatLng(37.554715, 126.970796); // Default to Seoul
    }
    if (!mapInstance.current) {
      initializeMap(center);
    } else {
      mapInstance.current.setCenter(center);
      updateMarkers();
    }
  }, [map, region]);

  return (
    <div className="container-noline font-['Pretendard']">
      <div ref={mapContainer} style={{ width, height }}></div>
    </div>
  );
};

export default TripListDetailKakaoMapComponent;
