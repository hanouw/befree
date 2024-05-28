import React, { useState } from "react";
import TripAddModalComponent from "../../components/tripList/TripAddModalComponent";
import useCustomMove from "../../hooks/useCustomMove";
import PagenationComponent from "../../components/tripList/PagenationComponent";

// 여행 계획 목록
const TripList = () => {
  const { moveToTripListDetail } = useCustomMove();

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

  // 여행 이미지 및 여러 정보
  const tripList = [
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_01.png",
      alt: "Main Image 01",
      date: "2024.01.01 ~ 2024.01.08",
      title: "친구와",
      style: noDrag,
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_02.png",
      alt: "Main Image 02",
      date: "2024.02.02 ~ 2024.02.13",
      title: "동료와",
      style: noDrag,
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_03.png",
      alt: "Main Image 03",
      date: "2024.04.03 ~ 2024.05.01",
      title: "가족과",
      style: noDrag,
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_04.png",
      alt: "Main Image 04",
      date: "2024.05.05 ~ 2024.05.06",
      title: "친구와",
      style: noDrag,
    },
  ];

  // 모달 띄우기 여부
  const [showModal, setShowModal] = useState(false);

  // 모달 상태 변화 함수
  const modalStateChange = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal ? <TripAddModalComponent callbackFn={modalStateChange} /> : <></>}
      {/* 상단 이미지 */}
      <div className="w-full mb-12 sm:mb-24" onClick={modalStateChange}>
        <img
          // 이미지 드래그 막기
          style={noDrag}
          className=" hover:cursor-pointer hidden sm:block"
          src={process.env.PUBLIC_URL + "/assets/imgs/trip_plan_top_img_01.png"}
        ></img>
        <img
          style={noDrag}
          className=" hover:cursor-pointer block sm:hidden"
          src={process.env.PUBLIC_URL + "/assets/imgs/trip_plan_top_img_02.png"}
        ></img>
      </div>

      {/* 이미지 아래 여행목록 시작 */}
      <div className="grid place-items-center">
        <span className="font-['Pretendard-Medium'] sm:text-2xl text-lg">여행 목록</span>
        <div className="w-[80%] my-[1%] border-[1px] border-neutral-500"></div>
      </div>
      <div className="grid place-items-center mt-10">
        {tripList.map((item) => (
          <div className="w-2/3" key={item.src} onClick={moveToTripListDetail}>
            <img src={item.src} alt={item.alt} style={item.style} className="rounded-md h-24 sm:h-full"></img>
            <div className="sm:mt-2 mb-4">
              <span className="font-[Pretendard-Light] text-sm sm:text-lg">{item.date}</span>
              <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
      <PagenationComponent />
    </>
  );
};

export default TripList;
