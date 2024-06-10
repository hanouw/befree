import React, { useEffect, useRef } from "react";
import { mapData } from "../../util/mapData";

const { kakao } = window;

const TripListDetailKakaoMapComponent = (props) => {
  const { width = "100%", height = "100%", map = [], region } = props;
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const bounds = useRef(null);

  const initializeMap = (center) => {
    const container = mapContainer.current;
    const options = {
      center,
      level: 6,
    };
    mapInstance.current = new kakao.maps.Map(container, options);
  };

  const updateMarkers = () => {
    if (Array.isArray(map) && map.length > 0) {
      bounds.current = new kakao.maps.LatLngBounds();
      map.forEach((el, index) => {
        const position = new kakao.maps.LatLng(el.mapy, el.mapx);
        const marker = new kakao.maps.Marker({
          map: mapInstance.current,
          position: position,
          title: el.title,
        });
        bounds.current.extend(position);

        // Draw line between markers
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
