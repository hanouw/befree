import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import { getTripDetail, updateTripDetail } from "../../api/befreeApi";
import TripListDetailKakaoMapComponent from "../../components/map/TripListDetailKakaoMapComponent";
import TripAddLoadingModalComponent from "../../components/tripPlanAdd/TripAddLoadingModalComponent";
import TripListDetailDateMoveModalComponent from "../../components/tripList/TripListDetailDateMoveModalComponent";

const ItemType = {
  CARD: "card",
};

const DraggableItem = ({
  item,
  index,
  moveCard,
  placeDeleteButtonClick,
  moveDateButtonClick,
  totalPage,
  page,
  refresh,
}) => {
  const placeDeleteButtonClickFn = (pid) => {
    placeDeleteButtonClick(pid);
  };

  const moveDateButtonShow = (pid) => {
    setShowMoveDateModal(!showMoveDateModal);
    setSelectedPid(pid);
  };

  const moveDateButtonCilckFn = (whatDate) => {
    moveDateButtonClick(selectedPid, whatDate);
  };

  const [showMoveDateModal, setShowMoveDateModal] = useState(false);
  const [selectedPid, setSelectedPid] = useState(-1);

  const ref = React.useRef(null);

  useEffect(() => {
    setShowMoveDateModal(false);
  }, [refresh]);

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover(draggedItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { type: ItemType.CARD, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 1 : 1,
        transition: "transform 1s ease",
      }}
      className={`flex justify-between items-center mb-10 px-4 border border-my-color-darkblue rounded-md py-4 text-sm transition-all duration-300 ${
        isDragging ? "bg-gray-100 m-3" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <div className="mr-3 cursor-grab hover:bg-gray-300 p-1 rounded">
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
        </div>
        <span className="font-[Pretendard-Regular]">
          {item.pid + 1}. {item.title}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-[Pretendard-Regular] text-gray-500 mr-6">
          {item.facilities[0]} 외 {item.facilities.length - 1} 개
        </span>
        {showMoveDateModal && selectedPid == item.pid ? (
          <TripListDetailDateMoveModalComponent
            totalPage={totalPage}
            page={page}
            callBackFn={moveDateButtonCilckFn}
          />
        ) : (
          <></>
        )}
        <div
          className="mr-4 cursor-pointer hover:mb-1"
          onClick={() => moveDateButtonShow(item.pid)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
        </div>

        <div
          className="hover:ring-2 hover:ring-slate-300 rounded-2xl mr-2 cursor-pointer"
          onClick={() => placeDeleteButtonClickFn(item.pid)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const TripListDetail = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [allItems, setAllItems] = useState([]); // 이중 배열 상태 추가
  const [loading, setLoading] = useState(false); // 로딩중인가
  const [refresh, setRefresh] = useState(true); // 날짜 이동 드롭다운 닫기 위한 state

  const { moveToTripListDetail } = useCustomMove();

  // map 데이터
  const [mapData, setMapData] = useState([]);
  // 핀 사이 거리 데이터
  const [amongPin, setAmongPin] = useState([]);

  const location = useLocation();
  const { tid, title, date, region } = location.state || {};

  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log("눌림", buttonNumber);
  };

  const saveModifyClicked = () => {
    const newAllItems = [...allItems];
    newAllItems[page - 1] = items;
    console.log("Saved items:", newAllItems);
    updateTripDetail(tid, newAllItems).then((dt) => {
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
    console.log(pinData);
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
        console.log(data);
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
  }, []);

  useEffect(() => {
    setRefresh(!refresh);
    if (allItems[page - 1] && allItems[page - 1].length > 0) {
      setItems(allItems[page - 1]);
      getTripDetail(tid, page).then((data) => {
        mapDataSetting(data);
      });
    }
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
    const reorderedItems = updatedItems.map((item, index) => ({
      ...item,
      pid: index,
    }));
    setItems(reorderedItems);
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
      console.log(allItems);
      return newReturnItems;
    });
  };

  return (
    <>
      {loading ? <TripAddLoadingModalComponent /> : <></>}
      <TripTopBannerComponent
        topText={"여행 계획 수정하기"}
        tid={tid}
        title={title}
        date={date}
        callBackFn={saveModifyClicked}
      />
      <div className="container-noline">
        <TripListDetailKakaoMapComponent
          width="1200px"
          height="600px"
          map={items}
          region={region}
          callBackFn={pinDistanceCallBack}
        />
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex justify-between items-center w-full max-w-[1200px]">
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

      <div className="flex justify-center my-4 mb-6">
        <div className="w-[1200px] border-[1px] border-neutral-500"></div>
      </div>

      <div className="flex justify-center">
        <div>
          <div className="w-[1200px]">
            {items.length === 0 ? (
              <div className="flex justify-center my-4 mt-52 mb-52 font-[Pretendard-Regular] text-xl">
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
          <PagenationComponent
            page={page}
            totalPage={totalPage}
            numButtonClicked={numButtonClicked}
          />
        </div>
      </div>
    </>
  );
};

const TripListDetailWithDnd = () => (
  <DndProvider backend={HTML5Backend}>
    <TripListDetail />
  </DndProvider>
);

export default TripListDetailWithDnd;
