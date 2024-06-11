import React, { useEffect, useRef, useState } from "react";
import { mapData } from "../../util/mapData";

const { kakao } = window;

const TripListDetailKakaoMapComponent = (props) => {
  const {
    width = "100%",
    height = "100%",
    map = [],
    region,
    callBackFn,
  } = props;
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const bounds = useRef(null);
  // 핀과 데이터 갱신 시 이전 데이터 삭제에 필요
  const [pinDistance, setPinDistance] = useState([]);
  const markers = useRef([]);
  const polylines = useRef([]);
  const overlays = useRef([]);
  // 여기까지
  const [currentLevel, setCurrentLevel] = useState(6); // 초기 지도 레벨 설정

  useEffect(() => {
    callBackFn(pinDistance);
  }, [pinDistance]);

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

    // // 지도 확대 축소 이벤트 등록
    // kakao.maps.event.addListener(mapInstance.current, "zoom_changed", () => {
    //   const level = mapInstance.current.getLevel();
    //   setCurrentLevel(level);
    updateMarkers(); // 확대/축소 시 마커와 오버레이 업데이트
    // });
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

  // 이동시간 계산 함수
  const calculateTimesAndDistance = (distance) => {
    const totalDistance = Math.round(distance);

    // 걷는 속도 : 4km/h -> 67 m/min
    const walkTimeMin = Math.round(distance / 67);
    const walkHours = Math.floor(walkTimeMin / 60);
    const walkMinutes = walkTimeMin % 60;

    // 자전거 속도 : 16km/h -> 267 m/min
    const cycleTimeMin = Math.round(distance / 267);
    const cycleHours = Math.floor(cycleTimeMin / 60);
    const cycleMinutes = cycleTimeMin % 60;

    return {
      distance: totalDistance,
      walkTime: `${walkHours > 0 ? `${walkHours}시간 ` : ""}${walkMinutes}분`,
      cycleTime: `${
        cycleHours > 0 ? `${cycleHours}시간 ` : ""
      }${cycleMinutes}분`,
    };
  };

  const displayOverlay = (title, position, distanceInfo) => {
    const content = `
      <ul class="bg-white border-2 rounded-lg p-2 text-sm font-[Pretendard-Light]">
        <li><span class="text-base font-[Pretendard-Medium]">${title}</span></li>
        <li><span class="label">거리 </span><span class="number">${distanceInfo.distance}</span>m</li>
        <li><span class="label">도보 </span>${distanceInfo.walkTime}</li>
        <li><span class="label">자전거 </span>${distanceInfo.cycleTime}</li>
      </ul>`;

    const overlay = new kakao.maps.CustomOverlay({
      map: mapInstance.current,
      content,
      position,
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3,
    });

    overlays.current.push(overlay);
  };

  // 여기서 마커(핀) 전부 추가
  const updateMarkers = () => {
    clearMapElements();
    setPinDistance([]);

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

        // 선 그리기
        if (index > 0) {
          const prevPosition = new kakao.maps.LatLng(
            map[index - 1].mapy,
            map[index - 1].mapx
          );
          const line = new kakao.maps.Polyline({
            map: mapInstance.current,
            path: [prevPosition, position],
            strokeWeight: 3,
            strokeColor: "#FF0000",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });

          // 선 그리기
          polylines.current.push(line);

          // 거리데이터
          const distance = line.getLength();
          const distanceInfo = calculateTimesAndDistance(distance);
          setPinDistance((prevDistances) => [...prevDistances, distanceInfo]);
          displayOverlay(el.title, position, distanceInfo);
        }
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
