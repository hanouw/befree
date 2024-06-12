import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import { confirm } from "../../api/memberApi";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
	password: "",
	accessToken: "",
	refreshToken: "",
	result: "",
};

const MyPageDelete = () => {
	const { moveToMyPage, moveToMain, moveToDelete, moveToModify } =
		useCustomMove();
	const { execLogout } = useCustomLogin();
	const location = useLocation();
	const val = { ...location.state }.val;

	const [data, setData] = useState(initState);
	const [password, setPassword] = useState(initState);

	const loginInfo = useSelector((state) => state.loginSlice);

	const handleChange = (e) => {
		password[e.target.name] = e.target.value;
		setPassword({ ...password });
		setData({
			...password,
			accessToken: loginInfo.accessToken,
			refreshToken: loginInfo.refreshToken,
			result: val,
		});
	};

	useEffect(() => {
		setPassword(initState);
	}, []);

	const handleClick = () => {
		console.log(data);
		if (val === "modify") {
			console.log("modiii");
			confirm(data).then((result) => {
				console.log("modi confirm result:", result);
				if (result == "success") {
					moveToModify();
				} else {
					alert("비밀번호가 일치하지 않습니다.");
					moveToDelete("modify");
				}
			});
		} else {
			confirm(data).then((result) => {
				console.log("confirm result:", result);
				if (result == "success") {
					console.log("탈퇴 성공이다");
					execLogout();
					alert("탈퇴가 완료되었습니다");
					moveToMain();
				} else {
					alert("비밀번호가 일치하지 않습니다.");
					moveToDelete();
				}
			});
		}
	};

	useEffect(() => {
		setPassword(initState);
	}, []);

	const inputClassName =
		"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";
	const buttonClassName =
		"text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";
	const emptyButtonClassName =
		"text-center w-full text-gray-900 inline-flex justify-center items-center border border-my-color-lightgreen hover:bg-my-color-superlightgreen focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5 bg-white";

	return (
		<BasicLayout>
			<div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">
				{val === "modify" ? "비밀번호 변경하기" : "정말로 탈퇴하시겠습니까?"}
			</div>
			<div className="w-full grid place-items-center gap-5">
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">
						비밀번호를 다시 한번 입력해주세요
					</span>
					<input
						name="password"
						type="password"
						className={inputClassName}
						placeholder="비밀번호 8자리 이상"
						value={password.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4 flex gap-10">
					<button className={emptyButtonClassName} onClick={handleClick}>
						돌아가기
					</button>
					<button className={buttonClassName} onClick={moveToMyPage}>
            {val === "modify" ? "확인" : "탈퇴하기"}
					</button>
				</div>
			</div>
		</BasicLayout>
	);
};

export default MyPageDelete;
