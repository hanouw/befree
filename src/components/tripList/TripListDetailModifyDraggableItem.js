import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TripListDetailDateMoveModalComponent from "../../components/tripList/TripListDetailDateMoveModalComponent";
import "../../css/Scrollbar.css";

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
    //console.log("moveDateButtonCilckFn, 날짜이동", selectedPid, whatDate);
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
        isDragging ? "bg-gray-100 m-1" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <div className="mr-3 cursor-grab hover:bg-gray-300 p-1 rounded">
          {/* 삼선 */}
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
        {showMoveDateModal && selectedPid === item.pid ? (
          <TripListDetailDateMoveModalComponent
            totalPage={totalPage}
            page={page}
            callBackFn={moveDateButtonCilckFn}
          />
        ) : (
          <span className="font-[Pretendard-Regular] text-gray-500 mr-6 hidden lg:inline">
            {item.facilities[0].length > 10
              ? " " + item.facilities[0].substring(0, 10) + "..."
              : " " + item.facilities[0]}
            외 {item.facilities.length - 1}개
          </span>
        )}
        <div
          className="mr-4 cursor-pointer hover:mb-1"
          onClick={() => moveDateButtonShow(item.pid)}
        >
          {/* 날짜이동 */}
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
          {/* 삭제 */}
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

export default DraggableItem;
