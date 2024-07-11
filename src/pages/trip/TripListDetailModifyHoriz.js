import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import { getTripDetail, updateTripDetail } from "../../api/befreeApi";
import TripListDetailKakaoMapComponent from "../../components/map/TripListDetailKakaoMapComponent";
import TripAddLoadingModalComponent from "../../components/tripPlanAdd/TripAddLoadingModalComponent";
import "../../css/Scrollbar.css";
import DraggableItem from "../../components/tripList/TripListDetailModifyDraggableItem";

const TripListDetail = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [allItems, setAllItems] = useState([]); // 이중 배열 상태 추가
  const [loading, setLoading] = useState(false); // 로딩중인가
  const [refresh, setRefresh] = useState(true); // 날짜 이동 드롭다운 닫기 위한 state

  const { moveToTripListDetail, moveToCodePage } = useCustomMove();

  // map 데이터
  const [mapData, setMapData] = useState([]);
  // 핀 사이 거리 데이터
  const [amongPin, setAmongPin] = useState([]);

  // 배치구분 (T: 가로, F: 세로)
  const [isXY, setIsXY] = useState(true);

  const location = useLocation();
  const { tid, title, date, region } = location.state || {};

  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log(" 날짜버튼 눌려서 callbackFn 실행, setPage 실행", buttonNumber);
  };

  const saveModifyClicked = () => {
    const newAllItems = [...allItems];
    newAllItems[page - 1] = items;

    // console.log(
    //   "수정한 내용 저장하기 위한 이전 전체 데이터, newAllItems : ",
    //   newAllItems
    // );

    const newFinalResultAllItems = newAllItems.map((finalItems) => {
      return finalItems.map((item, index) => ({
        ...item,
        pid: index,
      }));
    });

    // console.log("최종 저장될 수정된 데이터", newFinalResultAllItems);
    updateTripDetail(tid, newFinalResultAllItems).then((dt) => {
      if (dt.RESULT) {
        alert("저장되었습니다");
        moveToTripListDetail(tid, title, date, region);
      } else {
        alert("저장에 실패했습니다.");
      }
    });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split(".");
    const formattedMonth = month.length === 1 ? "0" + month : month;
    const formattedDay = day.length === 1 ? "0" + day : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const pinDistanceCallBack = (pinData) => {
    setAmongPin(pinData);
    console.log("pinData", pinData);
  };

  const getDayDiffDay = (startDate, finalDate) =>
    (finalDate - startDate) / (1000 * 3600 * 24);

  const splitDayAndCalculateDiff = (data) => {
    const dateParts = data.split(" ~ ");
    const startDate = new Date(formatDate(dateParts[0]));
    const finalDate = new Date(formatDate(dateParts[1]));
    return getDayDiffDay(startDate, finalDate) + 1;
  };

  useEffect(() => {
    setRefresh(!refresh);
    const days = splitDayAndCalculateDiff(date);
    setTotalPage(days);

    const fetchData = async () => {
      let initAllItems = new Array(days).fill([]);

      for (let i = 0; i < days; i++) {
        const data = await getTripDetail(tid, i + 1); // 각 날에 대한 데이터를 가져옴
        // console.log(
        //   "init, isXY로 인해서 실행되는 코드",
        //   i + 1,
        //   "일차 데이터 : ",
        //   data
        // );
        const formattedItems = data.RESULT.map((item, index) => ({
          ...item,
          pid: index,
        }));
        initAllItems[i] = formattedItems; // i번째 페이지에 데이터 할당
        if (i == page - 1) {
          setItems(formattedItems);
        }
      }

      setAllItems(initAllItems); // 모든 데이터를 가져온 후 상태를 업데이트
    };

    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
      // setItems(allItems[page - 1]);
    });
  }, [isXY]);

  useEffect(() => {
    setRefresh(!refresh);
    if (allItems[page - 1] && allItems[page - 1].length > 0) {
      setItems(allItems[page - 1]);
      getTripDetail(tid, page).then((data) => {
        mapDataSetting(data);
      });
    } else {
      setItems([]);
    }
    console.log("페이지 이동 시 찍히는 전체 데이터", allItems);
  }, [page, tid]);

  useEffect(() => {
    setRefresh(!refresh);
    setAllItems((prevAllItems) => {
      const newAllItems = [...prevAllItems];
      newAllItems[page - 1] = items;
      return newAllItems;
    });
  }, [items]);

  const mapDataSetting = (data) => {
    setAmongPin([]);
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
    setTotalPage(splitDayAndCalculateDiff(date));
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  const placeDeleteButtonClick = (pid) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(pid, 1);
      const newReturnItems = newItems.map((item, index) => ({
        ...item,
        pid: index,
      }));
      return newReturnItems;
    });
  };

  const moveDateButtonClick = (pid, whatDate) => {
    setItems((prevItems) => {
      const moveToPageTemp = [...allItems[whatDate - 1]]; // 이동하려는 페이지 복사
      const newItems = [...prevItems]; // 현재 페이지 복사
      allItems[whatDate - 1].push(
        newItems
          .filter((newItem) => newItem.pid === pid)
          .map((item) => ({
            ...item,
            pid: moveToPageTemp.length,
            days: whatDate,
          }))[0]
      );
      newItems.splice(pid, 1);
      const newReturnItems = newItems.map((item, index) => ({
        ...item,
        pid: index,
      }));
      console.log("날짜이동 버튼 클릭 후 allItems", allItems);
      return newReturnItems;
    });
  };

  return (
    <>
      <BasicLayout>
        {loading ? <TripAddLoadingModalComponent /> : <></>}
        <TripTopBannerComponent
          topText={"수정하기"}
          tid={tid}
          title={title}
          date={date}
          callBackFn={saveModifyClicked}
        />

      {/* 모니터 */}
      <div className="hidden lg:inline">
        <div className="w-full flex justify-center">
          {/* 일차 및 버튼 */}
          <div className="flex max-w-xs lg:max-w-6xl justify-between items-center w-full ">
            <span className="font-['Pretendard-Regular'] text-xl">
              {page} 일차 수정하기
            </span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600 mr-4">
                클릭한채로 드래그 하여 순서를 변경
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600  mr-4">
                클릭해서 삭제
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>

              <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600">
                클릭해서 날짜 변경
              </span>
            </div>
          </div>
        </div>
        {/* 구분선 */}
        <div className="flex justify-center my-4">
          <div className="w-full max-w-xs lg:max-w-6xl border-[1px] border-neutral-500"></div>
        </div>
        <div className="place-items-center grid py-3">
          <div className="flex gap-4 max-w-xs lg:max-w-6xl">
            <TripListDetailKakaoMapComponent
              width="600px"
              height="500px"
              map={items}
              region={region}
              isAlwaysView={true}
              isMobile={true}
              callBackFn={pinDistanceCallBack}
            />
            <div className="min-w-[536px] scrollable-container overflow-y-scroll h-[500px]">
              {items.length === 0 ? (
                <div className="flex justify-center font-[Pretendard-Regular] mt-[238px] min-w-[536px]">
                  아직 추가한 일정이 없습니다
                </div>
              ) : (
                items.map((item, index) => (
                  <DraggableItem
                    key={item.pid}
                    item={item}
                    index={index}
                    moveCard={moveCard}
                    placeDeleteButtonClick={placeDeleteButtonClick}
                    moveDateButtonClick={moveDateButtonClick}
                    totalPage={totalPage}
                    page={page}
                    refresh={refresh}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 */}
      <div className="inline lg:hidden">
        <div className="w-full flex justify-center">
          <TripListDetailKakaoMapComponent
            width="320px"
            height="180px"
            map={items}
            region={region}
            isAlwaysView={true}
            isMobile={true}
            callBackFn={pinDistanceCallBack}
          />
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex justify-between items-center w-full max-w-xs lg:max-w-6xl">
            <span className="font-['Pretendard-Regular'] text-xl">
              {page} 일차
            </span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600 mr-4">
                순서 변경
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600 mr-4">
                삭제
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>

              <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600">
                날짜 변경
              </span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="flex justify-center my-4 mb-6">
          <div className="w-full max-w-xs lg:max-w-6xl border-[1px] border-neutral-500"></div>
        </div>

        <div className="place-items-center grid py-3">
          <div className="max-w-xs lg:max-w-6xl w-full">
            {items.length === 0 ? (
              <div className="flex justify-center my-16 lg:my-4 lg:mt-52 lg:mb-52 font-[Pretendard-Regular] text-sm lg:text-xl">
                아직 추가한 일정이 없습니다
              </div>
            ) : (
              items.map((item, index) => (
                <DraggableItem
                  key={item.pid}
                  item={item}
                  index={index}
                  moveCard={moveCard}
                  placeDeleteButtonClick={placeDeleteButtonClick}
                  moveDateButtonClick={moveDateButtonClick}
                  totalPage={totalPage}
                  page={page}
                  refresh={refresh}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <PagenationComponent
        page={page}
        totalPage={totalPage}
        numButtonClicked={numButtonClicked}
      />
      </BasicLayout>
    </>
  );
};

const TripListDetailWithDnd = () => (
  <DndProvider backend={HTML5Backend}>
    <TripListDetail />
  </DndProvider>
);

export default TripListDetailWithDnd;
