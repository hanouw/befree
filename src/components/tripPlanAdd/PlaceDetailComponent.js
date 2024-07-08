import React, { useEffect, useState } from "react";
import KakaoMapComponent from "../map/KakaoMapComponent";
import { Link } from "react-router-dom";
import {
  getPlaceDetail,
  getPlaceDetailImg,
  getPlaceDetailIntro,
  disableData,
} from "../../api/tripApi";
import TripAddLoadingModalComponent from "./TripAddLoadingModalComponent";
import { matchIntro } from "../../util/parameterData";
import { useErrorBoundary } from 'react-error-boundary';
import useCustomMove from "../../hooks/useCustomMove";


// 여행지 상세 페이지
const PlaceDetailComponent = ({ contentId, contentTypeId, callBackFn }) => {
  const [placeDetail, setPlaceDetail] = useState(null);
  const [placeImg, setPlaceImg] = useState([]);
  const [placeIntro, setPlaceIntro] = useState(null);
  const [placeWithTour, setPlaceWithTour] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { moveToErrorPage } = useCustomMove()

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const modalClose = () => {
    callBackFn();
  };

  useEffect(() => {
    console.log("useEffect", contentId, contentTypeId);
    placeImg.length = 0;
    setLoading(true);

    Promise.all([
      getPlaceDetail(contentId),
      getPlaceDetailImg(contentId),
      getPlaceDetailIntro(contentId, contentTypeId),
      disableData(contentId),
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
    }).catch((error) => {
        moveToErrorPage()
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
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative w-full max-w-7xl p-6 mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              여행지 상세 정보
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crud-modal"
              onClick={() => modalClose()}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-160px)]">
            <header className="text-center mb-6 mt-6">
              <h2 className="text-2xl font-bold">{placeDetail.title}</h2>
              <p className="text-gray-600">{placeDetail.addr1}</p>
            </header>

            <section className="flex flex-col items-center mb-6">
              <div className="mb-4">
                <img
                  src={placeImg[selectedImageIndex]}
                  alt="Large Display"
                  className="w-[800px] h-[400px] object-cover rounded-md mb-4"
                // className="w-full max-w-3xl h-auto rounded-md mb-4"
                />
              </div>
              <div className="flex justify-center space-x-2">
                {placeImg.length > 1 &&
                  placeImg.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-24 h-16 rounded-md cursor-pointer transition-all ${selectedImageIndex === index
                        ? "border-2 border-green-500"
                        : "border-none"
                        }`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4">편의시설 정보</h3>
              <div className="border-t border-gray-300 mb-4"></div>
              {placeWithTour.length > 1 ? (
                <ul className="text-gray-700">
                  {placeWithTour.map((data, index) => (
                    <li key={index}>{data.replace(/<br\s*\/?>/g, "/")}</li>
                  ))}
                </ul>
              ) : (
                <ul className="text-gray-700">
                  <li>정보가 없습니다</li>
                </ul>
              )}
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4">기본정보</h3>
              <div className="border-t border-gray-300 mb-4"></div>
              <p className="text-gray-700">{placeDetail.overview}</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4">상세정보</h3>
              <div className="border-t border-gray-300 mb-4"></div>

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
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-4">지도</h3>
              <div className="border-t border-gray-300 mb-4"></div>
              <KakaoMapComponent width="full" height="600px" map={map} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceDetailComponent;
