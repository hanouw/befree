import React, { useRef, useState } from "react";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";
import PagenationComponent from "../../components/tripList/PagenationComponent";

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

  return (
    <>
      <div className="h-full">
        <KakaoMapComponent width="100vw" height="550px" />
      </div>
      <div className="flex justify-between items-center mt-10 px-4 pr-44 pl-44">
        <span className="font-[Pretendard-Regular] text-xl">1 일차</span>
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
      <div className="flex justify-center my-4 mt-48 font-[Pretendard-Regular]">추가한 일정이 없습니다</div>
      <div className="flex justify-center my-4 mt-4 mb-52 font-[Pretendard-Regular]">
        “추가하기” 버튼을 눌러 여행지를 추가하세요
      </div>
      {/* ================================================================================================================================================================================================================================================================================================================================= */}

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
      <div className="">
        {items.map((item) => (
          <div className="flex justify-between items-center mt-10 px-4 pr-44 pl-44" key={item.id}>
            <span className="block">{item.id}</span>
            <span className="block">{item.name}</span>
            <span className="block">{item.facilities}</span>
          </div>
        ))}
      </div>
      <PagenationComponent />
    </>
  );
};

export default TripListDetail;