import React, { useEffect, useState } from 'react';
import KakaoMapComponent from '../../components/map/KakaoMapComponent';
import { useParams } from 'react-router-dom';
import { getPlaceDetail } from '../../api/tripApi';

const images = [
  '/assets/imgs/defaultImageStroke.png',
  '/assets/imgs/defaultImage.png',
  '/assets/imgs/defaultImageStroke.png',
  '/assets/imgs/defaultImage.png',
];

// 여행지 상세 페이지
const PlaceDetail = () => {
  const { contentId } = useParams();
  console.log(contentId);

  useEffect(() => {
    console.log('useEffect');
    getPlaceDetail(contentId);
  }, [contentId]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <div className="w-2/3 lg:w-mywidth1200 mx-auto p-4 font-['Pretendard']">
        <header className="text-center mb-8">
          <h1 className="text-xl font-medium">관광지</h1>
          <h2 className="text-2xl font-bold mt-2">안목해변</h2>
          <p className="text-gray-600 mt-1">강원도 강릉시 창해로 14번길 3</p>
        </header>

        <nav className="flex justify-center mb-6">
          <button className="px-4 py-2 border-b-4 border-blue-500 font-semibold">사진</button>
          <button className="px-4 py-2">편의시설 정보</button>
          <button className="px-4 py-2">기본정보</button>
          <button className="px-4 py-2">상세정보</button>
          <button className="px-4 py-2">지도</button>
        </nav>

        <section className="flex flex-col items-center justify-center mb-8">
          <div className="mb-4 flex justify-center">
            <img src={images[selectedImageIndex]} alt="Large Display" className="w-[800px] h-[400px] rounded-md mb-4" />
          </div>
          <div className="flex justify-center space-x-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-16 rounded-md cursor-pointer transition-all ${
                  selectedImageIndex === index ? 'border-2 border-green-500' : 'border-none'
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">편의시설 정보</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>

          <div className="flex gap-4 mb-4">
            <div className="text-center">
              <img src="https://via.placeholder.com/40" alt="icon1" className="mx-auto mb-2" />
              <p>휠체어 데크</p>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/40" alt="icon2" className="mx-auto mb-2" />
              <p>유모차 유모차 대여</p>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/40" alt="icon3" className="mx-auto mb-2" />
              <p>장애인 화장실</p>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/40" alt="icon4" className="mx-auto mb-2" />
              <p>아기쉼터</p>
            </div>
          </div>
          <p className="text-gray-700">휠체어 데크 가능(무료) - 동물을 제외한 모든 곳 휠체어 이동 가능함</p>
          <p className="text-gray-700">
            유모차 유모차 대여 가능 (24개월 이하, 대여료 1,000원, 생활관 옆 계단에서 대여)
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">기본정보</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>

          <p className="text-gray-700">
            넓은 백사장과 잔잔한 모래와 동해의 청정해역, 여유 있는 주변 공간과 인근의 깔끔한 편의시설이 있고 동해의
            바닷물을 이용하여 온천을 즐길 수 있는 해수온천이 있어 새로운 체험을 할 수 있고, 해수욕 입문 주차 공간과
            승용미 개방되어 있다. 또한, 모터보트, 바나나보트 등 수상 레저를 즐길 수 있다.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">상세정보</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>

          <ul className="text-gray-700">
            <li>주소 : 강원도 강릉시 창해로 14번길 3</li>
            <li>전화번호 : 031-123-1234</li>
            <li>
              홈페이지 :{' '}
              <a href="http://gyeongju.go.kr/tour" className="text-blue-500">
                http://gyeongju.go.kr/tour
              </a>
            </li>
            <li>입장료 : 무료</li>
            <li>이용시간 : 연중무휴</li>
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">지도</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
          <KakaoMapComponent width="1170px" height="600px" />
        </section>
      </div>
    </>
  );
};

export default PlaceDetail;
