import React, { useEffect, useState } from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import MapComponent from "../../components/tripPlanAdd/MapComponent";
import FoundListComponent from "../../components/tripPlanAdd/FoundListComponent";
import { useLocation } from "react-router-dom";

// 여행 계획 추가
const TripPlanAdd = () => {
  const [city, setCity] = useState(null); // 서울 강남  - 이후 지역코드, 시군구 코드로 수정
  const [category, setCategory] = useState(null); // contentTypeId
  const [imgNece, setImgNece] = useState(null); // arrange
  const [keywordVal, setKeywordVal] = useState(null);
  const callBackFn = (
    selectedCities,
    selectedCategory,
    onlyWithImages,
    keyword
  ) => {
    console.log("callBackFn 실행됨");
    console.log(selectedCities, selectedCategory, onlyWithImages, keyword);

    setCity(selectedCities);
    setCategory(selectedCategory);
    if (onlyWithImages == true) {
      setImgNece("O");
    } else {
      setImgNece("A");
    }
    if (keyword != "" || keyword != "") {
      setKeywordVal(keyword);
    } else {
      setKeywordVal(null);
    }
  };

  const location = useLocation();

  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;

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
      <MapComponent />
      <FoundListComponent
        region={region}
        category={category}
        imgNece={imgNece}
        keywordVal={keywordVal}
      />
    </div>
  );
};

export default TripPlanAdd;
