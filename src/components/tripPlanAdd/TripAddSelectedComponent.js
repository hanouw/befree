import { useEffect, useState } from "react";
import "../../css/TripPlanAdd.css";
import useCustomMove from "../../hooks/useCustomMove";

// header가 아닌 여행지 추가 페이지의 헤더
const TripAddSelectedComponent = ({ addedList, callBackFn }) => {
  console.log(addedList);
  // 상태 선언 및 초기화
  const [items, setItems] = useState([]);
  useEffect(() => {
    callBackFn(items);
  }, [items]);

  // addedList가 바뀔 때 items 업데이트
  useEffect(() => {
    console.log(addedList);
    if (addedList !== undefined) {
      setItems((prevItems) => {
        // addedList가 배열이 아닌 객체일 경우 배열로 변환
        const newItems = Array.isArray(addedList) ? addedList : [addedList];
        // 중복된 항목 제거
        const filteredItems = newItems.filter(
          (newItem) =>
            !prevItems.some(
              (prevItem) => prevItem.contentId === newItem.contentId
            )
        );
        // 기존 항목에 새로운 항목 추가
        return [...prevItems, ...filteredItems];
      });
    }
  }, [addedList]);

  // 항목 삭제 함수
  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.contentId !== id));
  };

  return (
    <>
      <div className="container">
        <div className="added-list">
          <div className="text-center font-['Pretendard-Medium'] text-lg lg:text-2xl p-3">
            추가 된 목록
          </div>
          {items.length === 0 ? (
            <div className="font-['Pretendard-Regular'] text-gray-500 text-center text-base lg:text-lg">
              담은 여행지가 없습니다
            </div>
          ) : null}
          <div className="added-items">
            {items.map((item) => (
              <div className="item" key={item.contentId}>
                <span>{item.title}</span>
                <span className="details">
                  {item.facilities.map((facil, index) => (
                    <span key={index} className="mr-2">
                      {index + 1}. {facil}
                    </span>
                  ))}
                </span>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.contentId)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TripAddSelectedComponent;
