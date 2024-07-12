import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomMove from "../hooks/useCustomMove";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";

ChannelService.loadScript();

ChannelService.boot({
  pluginKey: "73f11a99-fd83-4242-ad0f-bfe8e7f953f0",
});

const MainPage = () => {
  // 페이지 슬라이드
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 페이지 이동
  const { moveToTripList } = useCustomMove();

  const images = [
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/main_04.jpg",
      alt: "Main Image 01",
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/main_05.png",
      alt: "Main Image 02",
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/main_06.png",
      alt: "Main Image 03",
    },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // 이미지 전환 인터벌 3초로 지정
    const intervalId = setInterval(() => {
      handleNextImage();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const introImages = [
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/mainImgs/trip.png",
      alt: "Main Intro Image 01",
      title: "시작하기",
      text: '상단 "여행" 탭을 눌러 시작하세요',
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/mainImgs/plan.png",
      alt: "Main Intro Image 02",
      title: "새 여행 추가하기",
      text: "이미지를 클릭하여 새로운 여행을 계획하세요",
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/mainImgs/filter.png",
      alt: "Main Intro Image 03",
      title: "여행지를 취향에 맞게",
      text: "맞춤형 검색으로 원하는 여행지를",
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/mainImgs/add.png",
      alt: "Main Intro Image 04",
      title: "장바구니처럼",
      text: "한 번에 담아서, 한 번에 추가",
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/mainImgs/place.png",
      alt: "Main Intro Image 05",
      title: "여행지의 상세 정보 확인",
      text: "여행 약자 유형에 맞는 여행지를 고르세요",
    },
    {
      src: process.env.PUBLIC_URL + "/assets/imgs/mainImgs/tripdetail.png",
      alt: "Main Intro Image 06",
      title: "나만의 여행 계획을 완성",
      text: "자, 이제 누구나 자유롭고 평등한 여행을 떠날 차례입니다",
    },
  ];

  return (
    <BasicLayout>
      {/* 이미지 드래그 막기 */}
      <img
        className="lg:h-max"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          KhtmlUserSelect: "none",
          userDrag: "none",
          WebkitUserDrag: "none",
          KhtmlUserDrag: "none",
          MozUserDrag: "none",
          msUserDrag: "none",
        }}
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].alt}
      />
      {/* 공통 설명 - grid-cols-1 lg:grid-cols-2 모바일은 세로 한줄로 나오도록 */}
      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 mb-20 lg:mb-48">
        {/* 데스크탑 및 모바일 - 아래아래 줄이 핵심,  hidden lg:block */}
        <div className="w-auto">
          <span className="font-['Pretendard-Semibold'] lg:text-2xl text-base">
            무장애 관광(Barrier-Free Tourism) 이란?
          </span>
          <div className="font-['Pretendard-Medium'] lg:text-base text-xs mb-4 w-80 lg:w-96 mt-4 break-keep">
            장애인, 고령자, 임산부, 영유아 및 동반자뿐만 아니라 신체, 사회,
            문화, 조건과 관계없이, 누구나 자유롭고 평등하며 안전하게 관광권을
            향유할 수 있는 환경을 제공하는 관광을 말합니다.
          </div>
          <span className="font-['Pretendard-Medium'] lg:text-base text-xs">
            BeFree는 문화 시설 및 관광지의 다양한 정보를 제공합니다.
          </span>
        </div>
        <div className="w-5/6 lg:w-auto mt-4 lg:mt-0 lg:mr-32">
          <img
            src={process.env.PUBLIC_URL + "/assets/imgs/main_content_01.png"}
            alt="Main Content 01"
          ></img>
        </div>
      </div>
      {/* 점선 */}
      <div className="w-full border-t-2 border-dashed border-gray-300 mb-20 lg:mb-48"></div>

      {introImages.map((data, index) => (
        <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 mb-28">
          <div
            className={`lg:pl-20 ${
              index % 2 === 0 ? "lg:hidden" : "lg:inline"
            }`}
          >
            <span className="font-['Pretendard-Semibold'] lg:text-2xl text-base">
              {data.title}
            </span>
            <div className="font-['Pretendard-Medium'] lg:text-base text-xs mb-4 max-w-80 lg:max-w-96 mt-4 break-keep">
              {data.text}
            </div>
          </div>
          <div
            className={`w-5/6 mt-4 lg:mt-0 ${
              index % 2 === 0 ? "lg:ml-32" : "lg:mr-32"
            }`}
          >
            <img src={data.src} alt={data.alt} className="rounded-lg border" />
          </div>
          <div
            className={`hidden lg:pr-20 ${
              index % 2 === 0 ? "lg:inline" : "lg:hidden"
            }`}
          >
            <span className="font-['Pretendard-Semibold'] lg:text-2xl text-base">
              {data.title}
            </span>
            <div className="font-['Pretendard-Medium'] lg:text-base text-xs mb-4 max-w-80 lg:max-w-96 mt-4 break-keep">
              {data.text}
            </div>
          </div>
        </div>
      ))}

      <span className="grid place-items-center font-semibold lg:text-2xl text-lg">
        새로운 여행을 찾아 떠나보세요!
      </span>
      <button
        onClick={moveToTripList}
        className="flex mx-auto mt-6 lg:mt-8 bg-transparent border-black border-2 py-2 px-8 focus:outline-none hover:bg-black hover:text-white rounded lg:text-lg text-sm"
      >
        여행 계획 추가하기
      </button>
    </BasicLayout>
  );
};

export default MainPage;
