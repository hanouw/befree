import React, { useState } from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import MapComponent from "../../components/tripPlanAdd/MapComponent";
import FoundListComponent from "../../components/tripPlanAdd/FoundListComponent";
import { useLocation } from "react-router-dom";
import { placeKeywordData } from "../../api/tripApi";

// 여행 계획 추가
const TripPlanAdd = () => {
  // navigate를 통한 데이터 전달
  const location = useLocation();
  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;

  // 지도 데이터 전달
  const [map, setMap] = useState([]);

  // 필터링 데이터 전달
  const [city, setCity] = useState(null); // 서울 강남  - 이후 지역코드, 시군구 코드로 수정
  const [category, setCategory] = useState(null); // contentTypeId
  const [imgNece, setImgNece] = useState(null); // arrange
  const [keywordVal, setKeywordVal] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // 콜백함수 FilterComponent 에서 호출
  const callBackFn = (
    selectedCities,
    selectedCategory,
    onlyWithImages,
    keyword
  ) => {
    console.log("TripPlanAdd callBackFn 실행됨");

    // useState에 필터링 결과 저장
    setCity(selectedCities);
    setCategory(selectedCategory);
    if (onlyWithImages === true) {
      setImgNece("O");
    } else {
      setImgNece("A");
    }
    if (keyword !== "" || keyword !== " ") {
      setKeywordVal(keyword);
    } else {
      setKeywordVal(null);
    }

    // API 전송
    placeKeywordData(
      1, // pageNo
      imgNece || "A", //arrange
      keywordVal, //keyword
      category, //contentTypeId
      region, //areaCode
      null, //sigunguCode
      null, //cat1
      null //cat2
    ).then((data) => {
      console.log("TripPlanAdd placeKeywordData 실행됨");
      console.log(data.response.body);

      // 지도 만들기
      let result = data.response.body.items.item;
      const newMap = []; // 새로운 배열 생성
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        const mapObj = {
          mapx: item.mapx,
          mapy: item.mapy,
          title: item.title,
        };
        newMap.push(mapObj);
      }
      setMap(newMap); // 상태 변수 업데이트
      console.log("TripPlanAdd updated map:", map);

      setTotalCount(data.response.body.totalCount);
    });
  };

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
      <MapComponent map={map} />
      <FoundListComponent
        region={region}
        category={category}
        imgNece={imgNece}
        keywordVal={keywordVal}
        totalCount={totalCount}
      />
    </div>
  );
};

export default TripPlanAdd;
