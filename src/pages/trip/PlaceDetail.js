import React, { useEffect, useState } from "react";
import KakaoMapComponent from "../../components/map/KakaoMapComponent";
import { Link, useParams } from "react-router-dom";
import {
  getPlaceDetail,
  getPlaceDetailImg,
  getPlaceDetailIntro,
  getPlaceDetailWithTour,
} from "../../api/tripApi";
import TripAddLoadingModalComponent from "../../components/tripPlanAdd/TripAddLoadingModalComponent";
import { matchIntro } from "../../util/parameterData";

// 여행지 상세 페이지
const PlaceDetail = () => {
  const { contentId, contentTypeId } = useParams();

  const [placeDetail, setPlaceDetail] = useState(null);
  const [placeImg, setPlaceImg] = useState([]);
  const [placeIntro, setPlaceIntro] = useState(null);
  const [placeWithTour, setPlaceWithTour] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    console.log("useEffect", contentId, contentTypeId);
    placeImg.length = 0;
    setLoading(true);
    Promise.all([
      getPlaceDetail(contentId),
      getPlaceDetailImg(contentId),
      getPlaceDetailIntro(contentId, contentTypeId),
      getPlaceDetailWithTour(contentId),
    ]).then(([detail, imgs, intro, withTour]) => {
      console.log("공통정보조회 결과:", detail);
      setPlaceDetail(detail);

      if (imgs.numOfRows > 0) {
        const images = imgs.items.item.map((item) => item.originimgurl);
        setPlaceImg(images);
      } else {
        console.log("이미지없");
        placeImg.push(
          detail.firstimage ||
            detail.firstimage2 ||
            process.env.PUBLIC_URL + "/assets/imgs/defaultImage84.png"
        );
      }

      console.log("소개정보조회 결과:", intro);
      const orderedList = matchIntro(contentTypeId, intro);
      setPlaceIntro(orderedList);

      console.log("무장애조회 결과:", withTour);
      const orderedWithTour = new Map(Object.entries(withTour));
      let orderedWithTourValue = [];
      for (const [name, value] of orderedWithTour) {
        let val = `${value}`;
        if (val !== "" && `${name}` !== "contentid") {
          if (val.includes("_")) {
            val = val.split("_")[0];
          }
          orderedWithTourValue.push(val);
        }
      }
      setPlaceWithTour(orderedWithTourValue);

      setLoading(false);
    });
  }, [contentId, contentTypeId]);

  if (loading) {
    return <TripAddLoadingModalComponent />;
  }

  const urlMatch = placeDetail.homepage.match(/href="([^"]*)"/);
  const url = urlMatch ? urlMatch[1] : null;

  const map = [
    {
      mapy: placeDetail.mapy,
      mapx: placeDetail.mapx,
      title: placeDetail.title,
    },
  ];

  return (
    <>
      <div className="w-2/3 lg:w-mywidth1200 mx-auto p-4 font-[Pretendard]">
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold mt-2">{placeDetail.title}</h2>

          <p className="text-gray-600 mt-1">{placeDetail.addr1}</p>
        </header>

        <nav className="flex justify-center mb-3"></nav>

        <section className="flex flex-col items-center justify-center mb-8">
          <div className="mb-4 flex justify-center">
            <img
              src={placeImg[selectedImageIndex]}
              alt="Large Display"
              className="w-[800px] h-[400px] object-cover rounded-md mb-4"
            />
          </div>
          <div className="flex justify-center space-x-4">
            {placeImg.length > 1 ? (
              placeImg.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-24 h-16 rounded-md cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? "border-2 border-green-500"
                      : "border-none"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))
            ) : (
              <> </>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">편의시설 정보</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>

          {/* <div className="flex gap-4 mb-4">
						<div className="text-center">
							<img
								src="https://via.placeholder.com/40"
								alt="icon1"
								className="mx-auto mb-2"
							/>
							<p>휠체어 데크</p>
						</div>
						<div className="text-center">
							<img
								src="https://via.placeholder.com/40"
								alt="icon2"
								className="mx-auto mb-2"
							/>
							<p>유모차 유모차 대여</p>
						</div>
						<div className="text-center">
							<img
								src="https://via.placeholder.com/40"
								alt="icon3"
								className="mx-auto mb-2"
							/>
							<p>장애인 화장실</p>
						</div>
						<div className="text-center">
							<img
								src="https://via.placeholder.com/40"
								alt="icon4"
								className="mx-auto mb-2"
							/>
							<p>아기쉼터</p>
						</div>
					</div> */}

          {placeWithTour.length > 1 ? (
            <ul className="text-gray-700">
              {placeWithTour.map((data, index) => {
                return <li key={index}>{data}</li>;
              })}
            </ul>
          ) : (
            <ul className="text-gray-700">
              <li>정보가 없습니다</li>
            </ul>
          )}
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">기본정보</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
          <p className="text-gray-700">{placeDetail.overview}</p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">상세정보</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>

          <ul className="text-gray-700">
            <li>주소 : {placeDetail.addr1}</li>
            <li>
              전화번호 :{" "}
              {placeDetail.tel ||
                placeIntro.infocenter ||
                placeIntro.infocenterfood ||
                placeIntro.infocentershopping ||
                placeIntro.infocenterlodging ||
                placeIntro.infocenterleports ||
                placeIntro.infocenterculture}
            </li>
            <li>
              홈페이지 :{" "}
              <Link to={url} className="text-blue-500" target="_blank">
                {url}
              </Link>
            </li>
            {Object.entries(placeIntro).length > 1 ? (
              Object.entries(placeIntro).map(([key, value], index) => (
                <li key={index}>
                  {key} : {value.replace(/<br\s*\/?>/g, "/")}
                </li>
              ))
            ) : (
              <li>
                {Object.keys(placeIntro)[0]} :{" "}
                {Object.values(placeIntro)[0].replace(/<br\s*\/?>/g, "/")}
              </li>
            )}
          </ul>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">지도</h3>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
          <KakaoMapComponent width="1170px" height="600px" map={map} />
        </section>
      </div>
    </>
  );
};

export default PlaceDetail;
