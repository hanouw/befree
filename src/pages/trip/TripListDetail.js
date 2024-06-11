import React, { useEffect, useState } from "react";
import TripListDetailKakaoMapComponent from "../../components/map/TripListDetailKakaoMapComponent";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import { getTripDetail } from "../../api/befreeApi";

// 여행 계획 상세
const TripListDetail = () => {
  // 여행지 목록
  const [items, setItems] = useState([]);

  // map 데이터
  const [mapData, setMapData] = useState([]);

  // 페이지네이션 ( ?일차 )
  const [page, setPage] = useState(1);

  // 총 일수
  const [totalPage, setTotalPage] = useState(5);

  // 다른 날짜로 이동
  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log("눌림", buttonNumber);
  };

  // hover
  const [isHover, setIsHover] = useState({});

  // 핀 사이 거리 데이터
  const [amongPin, setAmongPin] = useState([]);

  const { moveToTripPlanAdd, moveToPlaceDetail } = useCustomMove();

  const location = useLocation();

  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;

  useEffect(() => {
    getTripDetail(tid, page).then((data) => {
      setItems(data.RESULT);

      let tempMap = [];
      data.RESULT.map((tempData) => {
        console.log(tempData);
        tempMap.push({
          mapx: tempData.mapx,
          mapy: tempData.mapy,
          title: tempData.title,
          pid: tempData.pid,
        });
      });
      setMapData(tempMap);
    });
  }, [page]);

  const pinDistanceCallBack = (pinData) => {
    setAmongPin(pinData);
    console.log(pinData);
  };

  return (
    <>
      <TripTopBannerComponent
        topText={"여행지 살펴보기"}
        tid={tid}
        title={title}
        date={date}
      />
      <div className="container-noline">
        <TripListDetailKakaoMapComponent
          width="1200px"
          height="600px"
          map={mapData}
          region={region}
          callBackFn={pinDistanceCallBack}
        />
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <span className="font-['Pretendard-Regular'] text-xl">
            {page} 일차
          </span>
          <div className="flex space-x-4">
            <button
              // onClick={() => moveToTripPlanAdd(tid, title, date)}
              className="w-28 text-gray-900 flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5 bg-white"
            >
              편집하기
            </button>
            <button
              onClick={() => moveToTripPlanAdd(tid, title, date, region)}
              className="w-28 text-white flex justify-center items-center bg-my-color-darkblue hover:bg-slate-700 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5"
            >
              추가하기
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-4">
        <div className="w-[1200px] border-[1px] border-neutral-500"></div>
      </div>

      <div className="flex justify-center">
        <div>
          <div className="w-[1200px]">
            {items[0] ? (
              <></>
            ) : (
              <>
                <div className="flex justify-center my-4 mt-48 font-[Pretendard-Regular]">
                  추가한 일정이 없습니다
                </div>
                <div className="flex justify-center my-4 mt-4 mb-52 font-[Pretendard-Regular]">
                  “추가하기” 버튼을 눌러 여행지를 추가하세요
                </div>
              </>
            )}
            {items.map((item, index) => (
              <div
                className="flex justify-between items-center mt-10 mb-10 px-4 border border-my-color-darkblue rounded-md py-4 text-sm transition-all duration-300 hover:h-auto hover:py-8 cursor-pointer"
                key={item.pid}
                onMouseEnter={() =>
                  setIsHover((prevState) => ({ ...prevState, [index]: true }))
                }
                onMouseLeave={() =>
                  setIsHover((prevState) => ({ ...prevState, [index]: false }))
                }
                onClick={() =>
                  moveToPlaceDetail(item.contentId, item.contentTypeId)
                }
              >
                <span className="font-[Pretendard-Regular]">
                  {item.pid + 1}. {item.title}
                </span>

                {!isHover[index] || index == 0 ? (
                  <></>
                ) : (
                  <div className="font-[Pretendard-Regular] text-gray-600">
                    <ul className="dotOverlay distanceInfo font-[Pretendard-Light]">
                      <li>
                        <span className="label">
                          직전 여행지로부터의 거리:{" "}
                        </span>
                        <span className="number">
                          {amongPin[index - 1].distance}
                        </span>
                        m
                      </li>
                      <li>
                        <span className="label">도보: </span>
                        {amongPin[index - 1].walkTime}
                      </li>
                      <li>
                        <span className="label">자전거: </span>
                        {amongPin[index - 1].cycleTime}
                      </li>
                    </ul>
                  </div>
                )}

                {!isHover[index] ? (
                  <span className="font-[Pretendard-Regular] text-gray-500">
                    {item.facilities[0]} 외 {item.facilities.length - 1} 개
                  </span>
                ) : (
                  <div className="peer-hover:visible font-[Pretendard-Regular] text-gray-500">
                    {item.facilities.map((facility, index) => (
                      <div key={index}>
                        {index + 1}. {facility}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <PagenationComponent
            page={page}
            totalPage={totalPage}
            numButtonClicked={numButtonClicked}
          />
        </div>
      </div>
    </>
  );
};

export default TripListDetail;
