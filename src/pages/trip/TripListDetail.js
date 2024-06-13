import React, { useEffect, useState } from "react";
import TripListDetailKakaoMapComponent from "../../components/map/TripListDetailKakaoMapComponent";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import { getTripDetail } from "../../api/befreeApi";

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

// 여행 계획 상세
const TripListDetail = () => {
  // 여행지 목록
  const [items, setItems] = useState([]);

  // map 데이터
  const [mapData, setMapData] = useState([]);

  // map에 항상 보여줄 것인지
  const [isAlwaysView, setIsAlwaysView] = useState(false);

  // 페이지네이션 ( ?일차 )
  const [page, setPage] = useState(1);

  // 총 일수
  const [totalPage, setTotalPage] = useState(5);

  // hover
  const [isHover, setIsHover] = useState({});

  // 핀 사이 거리 데이터
  const [amongPin, setAmongPin] = useState([]);
  let amongPinTemp = null;

  const { moveToTripPlanAdd, moveToPlaceDetail, moveToTripListDetailModify } =
    useCustomMove();

  const location = useLocation();

  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;

  // 다른 날짜로 이동
  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log("눌림", buttonNumber);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split(".");

    const formattedMonth = month.length === 1 ? "0" + month : month;
    const formattedDay = day.length === 1 ? "0" + day : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const getDayDiffDay = (startDate, finalDate) =>
    (finalDate - startDate) / (1000 * 3600 * 24);

  const splitDayAndCalculateDiff = (data) => {
    const dateString = data;
    const dateParts = dateString.split(" ~ ");

    const startDateString = dateParts[0];
    const finalDateString = dateParts[1];

    const startDate = new Date(formatDate(startDateString));
    const finalDate = new Date(formatDate(finalDateString));

    const dayDifference = getDayDiffDay(startDate, finalDate);

    return dayDifference + 1;
  };

  useEffect(() => {
    getTripDetail(tid, page).then((data) => {
      setItems(data.RESULT);
      console.log(data.RESULT);

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

    setTotalPage(splitDayAndCalculateDiff(date));
  }, [page, isAlwaysView]);

  const pinDistanceCallBack = (pinData) => {
    setAmongPin(pinData);
    amongPinTemp = pinData;
  };

  return (
    <>
      <TripTopBannerComponent
        topText={"여행 계획"}
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
          isAlwaysView={isAlwaysView}
        />
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <span className="font-['Pretendard-Regular'] text-xl">
            {page} 일차
          </span>
          <div className="flex space-x-4">
            <div className="items-center flex">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onClick={() => setIsAlwaysView(!isAlwaysView)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-my-color-darkblue"></div>
              </label>
              <span className="font-['Pretendard-Regular'] ml-3 text-sm text-gray-600">
                마우스 올려 보기 / 항상 보기
              </span>
            </div>
            <button
              onClick={() =>
                moveToTripListDetailModify(tid, title, date, region)
              }
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
                className="flex justify-between items-center mt-10 mb-10 px-4 border border-my-color-darkblue rounded-md py-4 text-sm transition-all duration-400 ease-in-out hover:h-auto hover:py-8 cursor-pointer"
                key={item.pid}
                style={noDrag}
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
                {console.log(amongPin)}
                {!isHover[index] ||
                index == 0 ||
                amongPin[index - 1] == [] ||
                amongPin[index - 1] == undefined ||
                amongPin[index - 1] == null ? (
                  <></>
                ) : (
                  <div className="font-[Pretendard-Regular] text-gray-600">
                    {console.log(amongPin)}
                    <ul className="dotOverlay distanceInfo font-[Pretendard-Light]">
                      <li>
                        <span className="label">직전 여행지로부터의 거리:</span>
                        <span className="number">
                          {amongPin[index - 1].distance != undefined
                            ? amongPin[index - 1].distance
                            : "???"}
                        </span>
                        m
                      </li>
                      <li>
                        <span className="label">도보: </span>
                        {amongPin[index - 1].walkTime != undefined
                          ? amongPin[index - 1].walkTime
                          : "???"}
                      </li>
                      <li>
                        <span className="label">자전거: </span>
                        {amongPin[index - 1].cycleTime != undefined
                          ? amongPin[index - 1].cycleTime
                          : "???"}
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
