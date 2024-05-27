import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
  // 페이지 슬라이드
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: process.env.PUBLIC_URL + "/assets/imgs/main_04.jpg", alt: "Main Image 01" },
    { src: process.env.PUBLIC_URL + "/assets/imgs/main_05.png", alt: "Main Image 02" },
    { src: process.env.PUBLIC_URL + "/assets/imgs/main_06.png", alt: "Main Image 03" },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    // 이미지 전환 인터벌 3초로 지정
    const intervalId = setInterval(() => {
      handleNextImage();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BasicLayout>
      <img className="" src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
      <div className="grid place-items-center grid-cols-2 mb-4">
        <div className="w-auto ml-32">
          <span className="font-semibold text-2xl">무장애 관광(Barrier-Free Tourism) 이란?</span>
          <div className="font-semibold mb-4 w-96 mt-4 break-keep">
            장애인, 고령자, 임산부, 영유아 및 동반자뿐만 아니라 신체, 사회, 문화, 조건과 관계없이, 누구나 자유롭고
            평등하며 안전하게 관광권을 향유할 수 있는 환경을 제공하는 관광을 말합니다.
          </div>
          <span className="font-semibold">BeFree는 문화 시설 및 관광지의 다양한 정보를 제공합니다.</span>
        </div>
        <div className=" mr-32">
          <img src={process.env.PUBLIC_URL + "/assets/imgs/main_content_01.png"} alt="Main Content 01"></img>
        </div>
      </div>
      <span className="grid place-items-center font-semibold text-2xl">새로운 여행을 찾아 떠나보세요!</span>
      <button className="flex mx-auto mt-8 bg-transparent border-black border-2 py-2 px-8 focus:outline-none hover:bg-black hover:text-white rounded text-lg">
        여행 계획 추가하기
      </button>
    </BasicLayout>
  );
};

export default MainPage;
