import React, { useRef, useState } from "react";
import { createTrip } from "../../api/befreeApi";
import { useSelector } from "react-redux";

const initState = {
	ttitle: "",
	tregion: "",
	tbegin: "",
	tend: "",
};

const TripAddModalComponent = ({ callbackFn }) => {
	const [trip, setTrip] = useState({ ...initState });

	const handleClose = () => {
		// 닫기 실행됨
		console.log(callbackFn);
		callbackFn();
	};

	const handleChangeProduct = (e) => {
		// 얘가 변화 탐지해서 바꼈을 때 useState 값을 input 안에 있는 데이터로 바꿔주는 역할
		trip[e.target.name] = e.target.value;
		setTrip({ ...trip });
		console.log("is Changed");
		console.log(trip);
	};

	const loginInfo = useSelector((state) => state.loginSlice);

	const AddButtonClicked = () => {
		console.log("addButtonclicked email", loginInfo.email);
		createTrip(loginInfo.email, trip).then(() => handleClose());
	};

	return (
		<>
			<div
				id="crud-modal"
				tabIndex="-1"
				aria-hidden="true"
				className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full grid place-items-center backdrop-blur-md "
			>
				<div className="relative p-4 w-full max-w-md max-h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-950">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-200">
							<h3 className="text-lg font-['Pretendard-SemiBold'] text-gray-900 dark:text-white">
								여행 추가하기
							</h3>
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="crud-modal"
								onClick={handleClose}
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
						{/* <!-- Modal body --> */}
						<form className="p-4 md:p-5">
							<div className="grid gap-4 mb-4 grid-cols-2">
								<div className="col-span-2">
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white"
									>
										제목
									</label>
									<input
										id="title"
										name="ttitle"
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="여행 제목"
										required
										onChange={handleChangeProduct}
									/>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="region"
										className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white"
									>
										여행 지역
									</label>
									<select
										id="region"
										name="tregion"
										type="String"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
										defaultValue={""}
										onChange={handleChangeProduct}
									>
										<option className="font-[Pretendard-regular]" value="">
											전체
										</option>
										<option className="font-[Pretendard-regular]" value="1">
											서울
										</option>
										<option className="font-[Pretendard-regular]" value="6">
											부산
										</option>
										<option className="font-[Pretendard-regular]" value="4">
											대구
										</option>
										<option className="font-[Pretendard-regular]" value="2">
											인천
										</option>
										<option className="font-[Pretendard-regular]" value="5">
											광주
										</option>
										<option className="font-[Pretendard-regular]" value="3">
											대전
										</option>
										<option className="font-[Pretendard-regular]" value="7">
											울산
										</option>
										<option className="font-[Pretendard-regular]" value="8">
											세종
										</option>
										<option className="font-[Pretendard-regular]" value="31">
											경기
										</option>
										<option className="font-[Pretendard-regular]" value="32">
											강원
										</option>
										<option className="font-[Pretendard-regular]" value="33">
											충북
										</option>
										<option className="font-[Pretendard-regular]" value="34">
											충남
										</option>
										<option className="font-[Pretendard-regular]" value="35">
											경북
										</option>
										<option className="font-[Pretendard-regular]" value="36">
											경남
										</option>
										<option className="font-[Pretendard-regular]" value="37">
											전북
										</option>
										<option className="font-[Pretendard-regular]" value="38">
											전남
										</option>
										<option className="font-[Pretendard-regular]" value="39">
											제주
										</option>
									</select>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="startDate"
										className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white"
									>
										여행 시작일
									</label>
									<input
										id="startDate"
										name="tbegin"
										type="date"
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
										onChange={handleChangeProduct}
									></input>
								</div>
								<div className="col-span-2 sm:col-span-1">
									<label
										htmlFor="endDate"
										className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white"
									>
										여행 종료일
									</label>
									<input
										id="endDate"
										name="tend"
										type="date"
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
										onChange={handleChangeProduct}
									></input>
								</div>
							</div>
							<button
								type="button"
								className="text-black inline-flex items-center bg-gray-300 hover:bg-my-color-darkblue hover:text-white focus:ring-2 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Medium'] rounded-lg text-sm px-5 py-2.5 text-center"
								onClick={AddButtonClicked}
							>
								<svg
									className="me-1 -ms-1 w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clipRule="evenodd"
									></path>
								</svg>
								여행 추가하기
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default TripAddModalComponent;
