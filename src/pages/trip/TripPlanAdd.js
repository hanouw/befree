import React, { useEffect, useState } from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import { useLocation } from "react-router-dom";
import { placeKeywordData } from "../../api/tripApi";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";
import PagenationComponent from "../../components/tripList/PagenationComponent";

// 여행 계획 추가
const TripPlanAdd = () => {
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
  const [totalCount, setTotalCount] = useState(0);
  const [recentResult, setRecentResult] = useState({
    category: null, // contentTypeId
    imgNece: null, // arrange
    region: region, // areaCode
    keywordVal: null, // keyword
  });
  const [lastData, setLastData] = useState(null);

  // 콜백함수 FilterComponent 에서 호출
  const callBackFn = (
    selectedCities,
    selectedCategory,
    onlyWithImages,
    keyword
  ) => {
    console.log("TripPlanAdd callBackFn 실행됨");

    // 필터링 결과 정제
    const city = selectedCities;
    const category = selectedCategory;
    let imgNece = null;
    let keywordVal = null;
    if (onlyWithImages === true) {
      imgNece = "O";
    } else {
      imgNece = "A";
    }
    if (keyword !== "" || keyword !== " ") {
      keywordVal = keyword;
    } else {
      keywordVal = null;
    }

    // useState에 필터링 결과 저장
    setRecentResult({
      category: category, // contentTypeId
      imgNece: imgNece, // arrange
      region: region, // areaCode
      keywordVal: keywordVal, // keyword
    });

    sendPlaceKeywordDataApi();
  };

  // API 전송 함수
  const sendPlaceKeywordDataApi = () => {
    placeKeywordData(
      1, // pageNo
      recentResult.imgNece || "A", //arrange
      recentResult.keywordVal, //keyword
      recentResult.category, //contentTypeId
      recentResult.region, //areaCode
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

      let newTripList = [];

      for (let i = 0; i < data.response.body.numOfRows; i++) {
        const item = result[i];
        const tempPlace = {
          src:
            item.firstimage ||
            item.firstimage2 ||
            process.env.PUBLIC_URL + "/assets/imgs/defaultImageStroke.png",
          alt: `${item.cat3}-${item.contentid}`,
          title: item.title,
          address: item.addr1,
          style: noDrag,
        };
        newTripList.push(tempPlace);
      }
      setTripList(newTripList);
      console.log("set 실행 됨", newTripList);
    });
  };

  useEffect(() => {
    if (recentResult !== lastData) {
      sendPlaceKeywordDataApi();
      setLastData(recentResult);
    }
  }, [tripList]);

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
      <KakaoMapComponent width="1200px" height="600px" map={map} />

      {/* 기존 FoundListComponent */}
      <div className="container-noline-list">
        <div className="page-header">
          <h1>목록</h1>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
        </div>
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
      </div>

      <PagenationComponent />
    </div>
  );
};

export default TripPlanAdd;
