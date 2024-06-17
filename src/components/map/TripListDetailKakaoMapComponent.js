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
    isAlwaysView = false, // true 의 경우 항상 보여주고 false의 경우 hover 시에만 보여줌
  } = props;
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const bounds = useRef(null);
  const [pinDistance, setPinDistance] = useState([]);
  const markers = useRef([]);
  const polylines = useRef([]);
  const overlays = useRef([]);
  const [currentLevel, setCurrentLevel] = useState(6);

  useEffect(() => {
    callBackFn(pinDistance);
  }, [pinDistance, callBackFn]);

  const initializeMap = (center) => {
    const container = mapContainer.current;
    const options = {
      center,
      level: currentLevel,
    };
    mapInstance.current = new kakao.maps.Map(container, options);

    const zoomControl = new kakao.maps.ZoomControl();
    mapInstance.current.addControl(
      zoomControl,
      kakao.maps.ControlPosition.RIGHT
    );

    updateMarkers();
  };

  const clearMapElements = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    polylines.current.forEach((polyline) => polyline.setMap(null));
    overlays.current.forEach((overlay) => overlay.setMap(null));

    markers.current = [];
    polylines.current = [];
    overlays.current = [];
  };

  const calculateTimesAndDistance = (distance) => {
    const totalDistance = Math.round(distance);

    const walkTimeMin = Math.round(distance / 67);
    const walkHours = Math.floor(walkTimeMin / 60);
    const walkMinutes = walkTimeMin % 60;

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

  const createOverlayContent = (title, distanceInfo) => {
    return `
      <ul class="bg-white border-2 rounded-lg p-2 text-sm font-[Pretendard-Light]">
        <li><span class="text-base font-[Pretendard-Medium]">${title}</span></li>
        <li><span class="label">거리 </span><span class="number">${distanceInfo.distance}</span>m</li>
        <li><span class="label">도보 </span>${distanceInfo.walkTime}</li>
        <li><span class="label">자전거 </span>${distanceInfo.cycleTime}</li>
      </ul>`;
  };

  const createMarkerWithOverlay = (position, title, distanceInfo) => {
    const marker = new kakao.maps.Marker({
      map: mapInstance.current,
      position,
    });

    const content = createOverlayContent(title, distanceInfo);
    const overlay = new kakao.maps.CustomOverlay({
      content,
      position,
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3,
    });

    if (isAlwaysView) {
      overlay.setMap(mapInstance.current);
    } else {
      kakao.maps.event.addListener(marker, "mouseover", () =>
        overlay.setMap(mapInstance.current)
      );
      kakao.maps.event.addListener(marker, "mouseout", () =>
        overlay.setMap(null)
      );
    }

    markers.current.push(marker);
    overlays.current.push(overlay);
  };

  const updateMarkers = () => {
    return new Promise((resolve) => {
      clearMapElements();
      setPinDistance([]);

      if (Array.isArray(map) && map.length > 0) {
        bounds.current = new kakao.maps.LatLngBounds();
        map.forEach((el, index) => {
          const position = new kakao.maps.LatLng(el.mapy, el.mapx);
          const marker = new kakao.maps.Marker({
            map: mapInstance.current,
            position,
            title: el.title,
          });

          markers.current.push(marker);
          bounds.current.extend(position);

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

            polylines.current.push(line);

            const distance = line.getLength();
            const distanceInfo = calculateTimesAndDistance(distance);
            setPinDistance((prevDistances) => [...prevDistances, distanceInfo]);
            createMarkerWithOverlay(position, el.title, distanceInfo);
          } else {
            createMarkerWithOverlay(position, el.title, {
              distance: 0,
              walkTime: "0분",
              cycleTime: "0분",
            });
          }
        });
        mapInstance.current.setBounds(bounds.current);
      }
      resolve();
    });
  };

  useEffect(() => {
    let center;
    if (map.length === 0 && region) {
      const result = mapData.find((data) => data.areaCode == region);
      if (result) {
        center = new kakao.maps.LatLng(result.mapy, result.mapx);
      } else {
        center = new kakao.maps.LatLng(37.554715, 126.970796);
      }
    } else if (map.length > 0) {
      center = new kakao.maps.LatLng(map[0].mapy, map[0].mapx);
    } else {
      center = new kakao.maps.LatLng(37.554715, 126.970796);
    }
    if (mapInstance.current) {
      mapInstance.current.setCenter(center);
      if (map.length !== 0) {
        updateMarkers();
      } else {
        initializeMap(center);
      }
    } else {
      initializeMap(center);
    }
  }, [map, region]);

  return (
    <div className="container-noline font-['Pretendard']">
      <div ref={mapContainer} style={{ width, height }}></div>
    </div>
  );
};

export default TripListDetailKakaoMapComponent;
