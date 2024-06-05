import React, { useEffect, useState } from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import { useLocation } from "react-router-dom";
import { placeKeywordData, sendPlaceKeywordDataApi } from "../../api/tripApi";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";
import NextBackPagenationComponent from "../../components/tripList/NextBackPagenationComponent";

// 이미지 드래그 못하게 하는 style
const noDrag = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "-moz-none",
  msUserSelect: "none",
  KhtmlUserSelect: "none",
  userDrag: "none",
  WebkitUserDrag: "none",
  KhtmlUserDrag: "none",
  MozUserDrag: "-moz-none",
  msUserDrag: "none",
};

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

  // 여행 목록
  const [tripList, setTripList] = useState([]);

  // 필터링 데이터 전달
  const [city, setCity] = useState(null); // 서울 강남  - 이후 지역코드, 시군구 코드로 수정
  const [numOfRows, setNumOfRows] = useState(0);
  const [recentResult, setRecentResult] = useState({
    category: null, // contentTypeId
    imgNece: null, // arrange
    region: region, // areaCode
    keywordVal: null, // keyword
  });

  // 콜백함수 FilterComponent 에서 호출
  const callBackFn = (
    selectedCities,
    selectedCategory,
    onlyWithImages,
    keyword
  ) => {
    console.log("TripPlanAdd callBackFn 실행됨");

    // useState에 필터링 결과 저장
    setRecentResult({
      category: selectedCategory, // contentTypeId
      imgNece: onlyWithImages, // arrange
      region: region, // areaCode
      keywordVal: keyword, // keyword
    });
  };

  useEffect(() => {
    // API 전송 함수
    sendPlaceKeywordDataApi(recentResult).then((result) => {
      console.log("sendPlaceKeywordDataApi 리턴 데이터", result);
      setMap(result.newMap); // 상태 변수 업데이트
      console.log("TripPlanAdd updated map:", result.newMap);
      setNumOfRows(result.numOfRows);
      setTripList(result.newTripList);
      console.log("set 실행 됨", tripList);
    });
  }, [recentResult]);

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
      <KakaoMapComponent width="1200px" height="600px" map={map} region={region} />

      {/* 기존 FoundListComponent */}
      <div className="container-noline-list">
        <div className="page-header">
          <h1>목록</h1>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
        </div>
        {numOfRows ? (
          <>
            <div className="grid grid-cols-3 gap-0 mt-10">
              {tripList.map((item) => (
                <div key={item.alt} className="flex justify-evenly ">
                  <div className="flex flex-col" style={{ width: "90%" }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{ ...item.style, height: "300px" }}
                      className="rounded-md h-24 sm:h-full"
                    ></img>
                    <div className="sm:mt-2 mb-4">
                      <span className="font-[Pretendard-Light] text-sm sm:text-lg">
                        {item.title}
                      </span>
                      <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <NextBackPagenationComponent />
          </>
        ) : (
          <div className="flex justify-center my-4 mt-48 text-gray-700 mb-52 font-[Pretendard-Regular]">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanAdd;
