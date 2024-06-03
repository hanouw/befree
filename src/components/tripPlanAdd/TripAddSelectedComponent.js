import { useState } from "react";
import "../../css/TripPlanAdd.css";
import useCustomMove from "../../hooks/useCustomMove";

// header가 아닌 여행지 추가 페이지의 헤더
const TripAddSelectedComponent = () => {
  // 상태 선언 및 초기화
  const [items, setItems] = useState([
    {
      id: 1,
      name: "예시2",
      details: "왈라라라라라",
    },
  ]);

  // 항목 삭제 함수
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="container font-['Pretendard']">
        <div className="added-list">
          <h2>추가 된 목록</h2>
          <div className="added-items">
            <div className="item">
              <span>여의도 한강공원</span>
              <span className="details">시각장애인 편의시설, 휠체어·유아차 대여 가능</span>
              <button className="remove-btn">삭제</button>
            </div>
          </div>
          <div className="added-items">
            {items.map((item) => (
              <div className="item" key={item.id}>
                <span>{item.name}</span>
                <span className="details">{item.details}</span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
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
