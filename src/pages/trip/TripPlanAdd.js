import React, { useEffect, useState } from "react";
import FilterComponent from "../../components/tripPlanAdd/FilterComponent";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import TripAddSelectedComponent from "../../components/tripPlanAdd/TripAddSelectedComponent";
import { useLocation } from "react-router-dom";
import { sendPlaceKeywordDataApi } from "../../api/tripApi";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";
import NextBackPagenationComponent from "../../components/tripList/NextBackPagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import TripAddLoadingModalComponent from "../../components/tripPlanAdd/TripAddLoadingModalComponent";

// 여행 계획 추가
const TripPlanAdd = () => {
  // navigate를 통한 데이터 전달
  const location = useLocation();
  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;

  // 로딩중 모달 여부
  const [loading, setLoading] = useState(true);

  // 지도 데이터 전달
  const [map, setMap] = useState([]);

  // 여행 목록
  const [tripList, setTripList] = useState([]);

  // 마지막으로 담긴 데이터
  const [addedList, setAddedList] = useState();

  // 최종 전송용 데이터
  const [finalData, setFinalData] = useState();

  // 필터링 데이터 전달
  const [numOfRows, setNumOfRows] = useState(0);
  const [recentResult, setRecentResult] = useState({
    category: null, // contentTypeId
    imgNece: null, // arrange
    region: region, // areaCode
    sigungu: null,
    keywordVal: null, // keyword
    facilityCodeArray: [], // 편의시설
  });

  // 콜백함수 FilterComponent 에서 호출
  const callBackFn = (
    newSelectedRegionCode,
    selectedCategory,
    onlyWithImages,
    keyword,
    facilityCodeArray
  ) => {
    console.log("TripPlanAdd callBackFn 실행됨");

    // useState에 필터링 결과 저장
    setRecentResult({
      category: selectedCategory, // contentTypeId
      imgNece: onlyWithImages, // arrange
      region: newSelectedRegionCode[0]
        ? newSelectedRegionCode[0].areaCode
        : region, // areaCode
      sigungu: newSelectedRegionCode[0] ? newSelectedRegionCode[0].code : null, // sigungu
      keywordVal: keyword, // keyword
      facilityCodeArray: facilityCodeArray, // 편의시설
    });
  };

  // 최종 추가하기 버튼 클릭 =============================================================================== 3
  const finalAddClicked = () => {
    console.log("===============최종클릭=================");
  };

  // 여행지 추가되었을 때 리턴  ============================================================================= 1
  const selectedPlaceChange = (items) => {
    setFinalData(items);
    console.log(items);
    // [{contentId: "132215" facilities: ["장애인 주차장 있음", "출입구까지 턱이 없어 휠체어 접근 가능함", "주출입구는 턱이 없어 휠체어 접근 가능함"] mapx :"127.1109831778" mapy: "37.4960925880" title:"가락농수산물종합도매시장"}]
  };

  useEffect(() => {
    console.log(recentResult);
    setLoading(true);
    // API 전송 함수
    sendPlaceKeywordDataApi(recentResult).then((result) => {
      console.log("sendPlaceKeywordDataApi 리턴 데이터", result);
      setMap(result.newMap); // 상태 변수 업데이트
      console.log("TripPlanAdd updated map:", result.newMap);
      setNumOfRows(result.numOfRows);
      setTripList(result.newTripList);
      setLoading(false);
    });
  }, [recentResult]);

  const addPlaceToTempList = (contentId, title, facilities, mapx, mapy) => {
    alert("추가되었습니다");
    setAddedList({
      contentId: contentId,
      title: title,
      facilities: facilities,
      mapx: mapx,
      mapy: mapy,
    });
  };

  const { moveToPlaceDetail } = useCustomMove();

  return (
    <div>
      {loading ? <TripAddLoadingModalComponent /> : <></>}
      <TripTopBannerComponent
        topText={"여행지 추가하기"}
        tid={tid}
        title={title}
        date={date}
        callBackFn={finalAddClicked}
      />
      <TripAddSelectedComponent
        addedList={addedList}
        callBackFn={selectedPlaceChange}
      />
      <FilterComponent region={region} callBackFn={callBackFn} />
      <KakaoMapComponent
        width="1200px"
        height="600px"
        map={map}
        region={region}
      />

      {/* 기존 FoundListComponent */}
      <div className="container-noline-list">
        <div className="page-header">
          <h1>목록</h1>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
        </div>
        {numOfRows ? (
          <>
            <div className="grid grid-cols-3 gap-0 mt-10">
              {console.log(tripList)}
              {tripList.map((item) => (
                <div key={item.alt} className="flex justify-evenly mb-10">
                  <div className="flex flex-col" style={{ width: "90%" }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      style={{ ...item.style, height: "300px" }}
                      className="rounded-md h-24 sm:h-full"
                    ></img>
                    <div className="sm:mt-2">
                      <span className="font-[Pretendard-Light] text-sm sm:text-lg">
                        {item.title}
                      </span>
                      <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">
                        {item.address}
                      </div>
                      {item.facility.map((facil, index) => (
                        <div
                          key={index}
                          className="font-[Pretendard-Light] text-xs sm:text-sm text-gray-600"
                        >
                          - {facil}
                        </div>
                      ))}
                    </div>
                    {/* button start */}
                    <div className="grid place-items-center">
                      <div className="flex items-center justify-between w-full h-10 text-base">
                        <button
                          type="button"
                          className=" mt-2 text-my-color-darkblue border-2 border-my-color-darkblue hover:bg-gray-100 hover:font-[Pretendard-ExtraBold] focus:ring-4 focus:outline-none focus:ring-gray-200 font-[Pretendard-SemiBold] rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center"
                          onClick={()=> moveToPlaceDetail(item.contentId, item.contentTypeId)}
                        >
                          자세히 보기
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="gap-3 mt-2 text-white bg-my-color-darkblue hover:bg-slate-500 hover:font-[Pretendard-ExtraBold] focus:ring-4 focus:outline-none focus:ring-gray-200 font-[Pretendard-SemiBold] rounded-md text-base px-5 py-2.5 text-center inline-flex items-center"
                          onClick={() =>
                            addPlaceToTempList(
                              item.contentId,
                              item.title,
                              item.facility,
                              item.mapx,
                              item.mapy
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          추가하기
                        </button>
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
