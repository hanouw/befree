import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import TripTopBannerComponent from "../../components/tripPlanAdd/TripTopBannerComponent";
import { getTripDetail } from "../../api/befreeApi";

// ########################################################
// ########################################################
// ########################################################
// ########################################################
// ##############    참고용 입니다 사용 안함    #############
// ########################################################
// ########################################################
// ########################################################
// ########################################################
// ########################################################

const ItemType = {
  CARD: "card",
};

const DraggableItem = ({ item, index, moveCard }) => {
  const ref = React.useRef(null);

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
        opacity: isDragging ? 0.5 : 1,
        transition: "transform 1s ease",
      }}
      className={`flex justify-between items-center mb-10 px-4 border border-my-color-darkblue rounded-md py-4 text-sm transition-all duration-300 ${
        isDragging ? "bg-gray-200" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <div className="mr-3 cursor-grab hover:bg-gray-300 p-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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
        <div className="hover:ring-2 hover:ring-slate-300 rounded-2xl mr-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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

  const location = useLocation();
  const { tid, title, date, region } = location.state || {};

  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
    console.log("눌림", buttonNumber);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split(".");
    const formattedMonth = month.length === 1 ? "0" + month : month;
    const formattedDay = day.length === 1 ? "0" + day : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
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
    getTripDetail(tid, page).then((data) => {
      setItems(data.RESULT);
    });
    setTotalPage(splitDayAndCalculateDiff(date));
  }, [page]);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  return (
    <>
      <TripTopBannerComponent
        topText={"여행 계획 수정하기"}
        tid={tid}
        title={title}
        date={date}
      />
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
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600 mr-4">
              를 클릭한채로 드래그 하여 순서를 변경하세요
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="font-['Pretendard-Regular'] ml-1 text-sm text-gray-600">
              를 클릭해서 삭제하세요
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
