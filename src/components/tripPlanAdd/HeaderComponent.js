import { useState } from "react";
import "../../css/TripPlanAdd.css";

const HeaderComponent = () => {
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
			<div className="container-noline font-['Pretendard']">
				<header className="header">
					<h1>여행지 추가하기</h1>
					<div className="buttons">
						<button>돌아가기</button>
						<button>추가하기</button>
					</div>
				</header>

				<div className="banner">
					<img src="/assets/imgs/trip_list_size_down_01.png" alt="Banner" />
					<div className="banner-text">
						<p>2024.01.01 ~ 2024.01.08</p>
						<p>친구와 함께</p>
					</div>
				</div>
			</div>

			<div className="container font-['Pretendard']">
				<div className="added-list">
					<h2>추가 된 목록</h2>
					<div className="added-items">
						<div className="item">
							<span>여의도 한강공원</span>
							<span className="details">
								시각장애인 편의시설, 휠체어·유아차 대여 가능
							</span>
							<button className="remove-btn">삭제</button>
						</div>
					</div>
					<div className="added-items">
						{items.map((item) => (
							<div className="item" key={item.id}>
								<span>{item.name}</span>
								<span className="details">{item.details}</span>
								<button
									className="remove-btn"
									onClick={() => removeItem(item.id)}
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

export default HeaderComponent;
