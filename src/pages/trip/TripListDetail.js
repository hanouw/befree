import React, { useState } from "react";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";

// 여행 계획 상세
const TripListDetail = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      place: "여의도 한강공원",
      facilities: ["시각장애인 편의시설", "휠체어 유아차 대여 가능"],
    },
    {
      id: 2,
      place: "여의도 역",
      facilities: ["휠체어 객실 있음"],
    },
    {
      id: 3,
      place: "이마트",
      facilities: ["시각장애인 편의시설", "유아의자 있음"],
    },
    {
      id: 4,
      place: "63스퀘어",
      facilities: ["수유실 있음"],
    },
    {
      id: 5,
      place: "오리배 타는 곳",
      facilities: ["휠체어 유아차 대여 가능"],
    },
  ]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);

  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log("눌림", buttonNumber);
  };

  const { moveToTripPlanAdd, moveToBack } = useCustomMove();

  const location = useLocation();

  const tid = { ...location.state }.tid;
  const title = { ...location.state }.title;
  const date = { ...location.state }.date;
  const region = { ...location.state }.region;

  return (
    <>
      <TripTopBannerComponent topText={"여행지 살펴보기"} tid={tid} title={title} date={date} />
      <div className="container-noline">
        <KakaoMapComponent width="1200px" height="600px" region={region} />
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
          <span className="font-['Pretendard-Regular'] text-xl">1 일차</span>
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
      <div className="flex justify-center my-4 mt-48 font-[Pretendard-Regular]">추가한 일정이 없습니다</div>
      <div className="flex justify-center my-4 mt-4 mb-52 font-[Pretendard-Regular]">
        “추가하기” 버튼을 눌러 여행지를 추가하세요
      </div>
      {/* 2일차 시작 포인트====================================================================================================================================================================================================================================================== */}

      <div className="flex justify-between items-center mt-10 px-4 pr-44 pl-44">
        <span className="font-[Pretendard-Regular] text-xl">2 일차</span>
        <div className="flex space-x-4">
          <button className="text-center w-28 text-gray-900 inline-flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5 bg-white">
            편집하기
          </button>
          <button className="text-center w-28 text-white inline-flex justify-center items-center bg-my-color-darkblue hover:bg-slate-700 border-black focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5">
            추가하기
          </button>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <div className="w-[80%] border-[1px] border-neutral-500"></div>
      </div>
      <div className="pr-44 pl-44">
        {items.map((item) => (
          <div
            className="flex justify-between items-center mt-10 mb-10 px-4 border border-my-color-darkblue rounded-md py-4 text-sm"
            key={item.id}
          >
            <span className="font-[Pretendard-Regular]">
              {item.id}. {item.place}
            </span>
            <span className="font-[Pretendard-Regular]">{item.facilities}</span>
          </div>
        ))}
      </div>
      <PagenationComponent page={page} totalPage={totalPage} numButtonClicked={numButtonClicked} />
    </>
  );
};

export default TripListDetail;
