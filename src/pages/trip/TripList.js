import React, { useEffect, useState } from "react";
import TripAddModalComponent from "../../components/tripList/TripAddModalComponent";
import TripModifyModalComponent from "../../components/tripList/TripModifyModalComponent";
import useCustomMove from "../../hooks/useCustomMove";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import { getTripList, shareTrip } from "../../api/befreeApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useSelector } from "react-redux";

// 여행 계획 목록
const TripList = () => {
	const { moveToTripListDetail, moveToMain, moveToLogin } = useCustomMove();
	// 모달 띄우기 여부
	const [showModal, setShowModal] = useState(false);
	const [showModifyModal, setShowModifyModal] = useState(false);
	const [modifyModalData, setModifyModalData] = useState(null);

	const [tripList, setTripList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	const loginInfo = useSelector((state) => state.loginSlice);

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

	const handleClickShare = (tid) => {
		const isConfirmed = window.confirm("여행 계획을 공유하시겠습니까?");
		if (isConfirmed) {
			shareTrip(loginInfo.email, tid).then((result) => {
				console.log("shareTrip result:", result);
				alert("공유되었습니다. 공유된 코스에서 확인해보세요!");
			});
		}
	};

	// 모달 상태 변화 함수
	const modalStateChange = () => {
		setShowModal(!showModal);
		fetchTripList(page);
	};

	// 수정 모달 상태 변화 함수
	const modifyModalStateChange = ({ tid, title, region, date }) => {
		if (showModifyModal) {
			// true 모달이 꺼지는 상황
			setShowModifyModal(false);
			setModifyModalData(null);
			console.log("모달 꺼진다");
		} else {
			// false 모달이 켜지는 상황
			setShowModifyModal(true);
			if (
				tid != undefined &&
				title != undefined &&
				region != undefined &&
				date != undefined
			) {
				const formatDate = (dateString) => {
					const [year, month, day] = dateString.split(".");

					const formattedMonth = month.length === 1 ? "0" + month : month;
					const formattedDay = day.length === 1 ? "0" + day : day;

					return `${year}-${formattedMonth}-${formattedDay}`;
				};

				const begin = formatDate(date.split(" ~ ")[0]);
				const end = formatDate(date.split(" ~ ")[1]);

				console.log(begin);
				console.log(end);
				setModifyModalData({
					tid: tid,
					title: title,
					region: region,
					begin: begin,
					end: end,
				});
			}
		}
		fetchTripList(page);
	};

	const numButtonClicked = (buttonNumber) => {
		setPage(buttonNumber);
		console.log("눌림", buttonNumber);
	};

	const fetchTripList = (page) => {
		console.log("fetchTripList 호출됨 email", loginInfo.email);
		getTripList(loginInfo.email, page).then((data) => {
			console.log("안쪽");
			let dataResult = data.RESULT.paginatedTrips;
			setTotalPage(data.RESULT.totalPage);
			console.log(dataResult);

			const tripListTemp = dataResult.map((trip) => {
				const tbegin = new Date(trip.tbegin);
				const tend = new Date(trip.tend);
				const formattedBeginDate = `${tbegin.getFullYear()}.${
					tbegin.getMonth() + 1
				}.${tbegin.getDate()}`;
				const formattedEndDate = `${tend.getFullYear()}.${
					tend.getMonth() + 1
				}.${tend.getDate()}`;

				return {
					src:
						process.env.PUBLIC_URL +
						"/assets/imgs/trip_list_size_down_" +
						trip.tid +
						".png",
					alt: trip.tid,
					date: formattedBeginDate + " ~ " + formattedEndDate,
					title: trip.ttitle,
					region: trip.tregion,
					style: noDrag,
				};
			});

			setTripList(tripListTemp);
		});
	};

	const { isLogin } = useCustomLogin();

	useEffect(() => {
		console.log("useEffect 실행됨");
		console.log("isLogin:", isLogin);
		if (!isLogin) {
			const isConfirmed = window.confirm(
				"로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
			);
			if (isConfirmed) {
				moveToLogin();
			} else {
				moveToMain();
			}
		}
		if (isLogin) {
			fetchTripList(page);
		}
	}, [page]);

	return (
		<>
			{showModal ? (
				<TripAddModalComponent callbackFn={modalStateChange} />
			) : (
				<></>
			)}
			{showModifyModal ? (
				<TripModifyModalComponent
					tid={modifyModalData.tid}
					title={modifyModalData.title}
					region={modifyModalData.region}
					begin={modifyModalData.begin}
					end={modifyModalData.end}
					callbackFn={modifyModalStateChange}
				/>
			) : (
				<></>
			)}
			{/* 상단 이미지 */}
			<div
				className="w-full mb-8 sm:mb-24 flex justify-center items-center"
				onClick={modalStateChange}
			>
				<img
					// 이미지 드래그 막기
					style={{ ...noDrag, objectFit: "cover" }}
					className="hover:cursor-pointer hidden sm:block w-full"
					src={process.env.PUBLIC_URL + "/assets/imgs/trip_plan_top_img_01.png"}
					alt="Trip Plan Top Image 01"
				/>
				<img
					style={{ ...noDrag, objectFit: "cover" }}
					className="hover:cursor-pointer block sm:hidden w-full"
					src={process.env.PUBLIC_URL + "/assets/imgs/trip_plan_top_img_02.png"}
					alt="Trip Plan Top Image 02"
				/>
			</div>

			{/* 이미지 아래 여행목록 시작 */}
			<div className="grid place-items-center">
				<span className="font-['Pretendard-Medium'] sm:text-2xl text-base">
					여행 목록
				</span>
				<div className="w-2/3 lg:w-mywidth1200 my-[1%] border-[1px] border-neutral-500"></div>
			</div>
			<div className="grid place-items-center lg:mt-10 mt-3">
				{tripList.map((item) => (
					<div className="w-2/3 lg:w-mywidth1200" key={item.src}>
						<img
							src={item.src}
							alt={item.alt}
							style={item.style}
							className="rounded-md h-14 sm:h-full hover:cursor-pointer"
							onClick={() =>
								moveToTripListDetail(
									item.alt,
									item.title,
									item.date,
									item.region
								)
							}
						></img>
						<div className="flex justify-between">
							<div
								className="sm:mt-2 mb-4 hover:cursor-pointer"
								onClick={() =>
									moveToTripListDetail(
										item.alt,
										item.title,
										item.date,
										item.region
									)
								}
							>
								<span className="font-[Pretendard-Light] text-sm sm:text-lg">
									{item.date}
								</span>
								<div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">
									{item.title}
								</div>
							</div>
							<div className="flex items-center sm:mt-2 mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-7 mr-4 cursor-pointer hover:mb-1"
									onClick={() => handleClickShare(item.alt)}
								>
									<path
										strokelnecap="round"
										strokelnejoin="round"
										d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="size-8 mr-4 cursor-pointer hover:mb-1"
									onClick={() =>
										modifyModalStateChange({
											tid: item.alt,
											title: item.title,
											region: item.region,
											date: item.date,
										})
									}
								>
									<path
										strokelnecap="round"
										strokelnejoin="round"
										d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
									/>
								</svg>
							</div>
						</div>
					</div>
				))}
			</div>
			<PagenationComponent
				page={page}
				totalPage={totalPage}
				numButtonClicked={numButtonClicked}
			/>
		</>
	);
};

export default TripList;
