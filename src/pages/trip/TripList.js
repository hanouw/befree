import React, { useEffect, useState } from "react";
import TripAddModalComponent from "../../components/tripList/TripAddModalComponent";
import useCustomMove from "../../hooks/useCustomMove";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import { getTripList } from "../../api/befreeApi";

// 여행 계획 목록
const TripList = () => {
  const { moveToTripListDetail } = useCustomMove();
  // 모달 띄우기 여부
  const [showModal, setShowModal] = useState(false);
  const [tripList, setTripList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

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

  // 모달 상태 변화 함수
  const modalStateChange = () => {
    setShowModal(!showModal);
    fetchTripList(page);
  };

  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log("눌림", buttonNumber);
  };

  const fetchTripList = (page) => {
    console.log("fetchTripList 호출됨");
    getTripList("befree@befree.com", page).then((data) => {
      console.log("안쪽");
      let dataResult = data.RESULT.paginatedTrips;
      setTotalPage(data.RESULT.totalPage);
      console.log(dataResult);

      const tripListTemp = dataResult.map((trip) => {
        const tbegin = new Date(trip.tbegin);
        const tend = new Date(trip.tend);
        const formattedBeginDate = `${tbegin.getFullYear()}.${tbegin.getMonth() + 1}.${tbegin.getDate()}`;
        const formattedEndDate = `${tend.getFullYear()}.${tend.getMonth() + 1}.${tend.getDate()}`;

        return {
          src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_" + trip.tid + ".png",
          alt: trip.tid,
          date: formattedBeginDate + " ~ " + formattedEndDate,
          title: trip.ttitle,
          style: noDrag,
        };
      });

      setTripList(tripListTemp);
    });
  };

  useEffect(() => {
    console.log("useEffect 실행됨");
    fetchTripList(page);
  }, [page]);

  return (
    <>
      {showModal ? <TripAddModalComponent callbackFn={modalStateChange} /> : null}
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
        <div className="w-2/3 lg:w-mywidth1200 my-[1%] border-[1px] border-neutral-500"></div>
      </div>
      <div className="grid place-items-center mt-10">
        {tripList.map((item) => (
          <div
            className="w-2/3 lg:w-mywidth1200"
            key={item.src}
            onClick={() => moveToTripListDetail(item.alt, item.title, item.date)}
          >
            <img src={item.src} alt={item.alt} style={item.style} className="rounded-md h-24 sm:h-full"></img>
            <div className="sm:mt-2 mb-4">
              <span className="font-[Pretendard-Light] text-sm sm:text-lg">{item.date}</span>
              <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
      <PagenationComponent page={page} totalPage={totalPage} numButtonClicked={numButtonClicked} />
    </>
  );
};

export default TripList;
