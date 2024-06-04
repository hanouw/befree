import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";
import { register } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
	email: "",
	password: "",
	name: "",
};

const SignupPage = () => {
	const { moveToLogin, moveToMain } = useCustomMove();
	const { execLogin } = useCustomLogin();

	const [inputVal, setInputVal] = useState({ ...initState });

	const handleChange = (e) => {
		inputVal[e.target.name] = e.target.value;
		setInputVal({ ...inputVal });
	};

	const handleClickRegister = () => {
		console.log(inputVal);
		register(inputVal).then((data) => {
			console.log(data);
			if (data.error) {
				alert("이미 존재하는 이메일 입니다. 로그인을 해주세요.");
			} else {
				execLogin({ email: inputVal.email, password: inputVal.password });
				alert("회원가입을 성공하였습니다.");
				moveToMain();
			}
		});
	};
	const inputClassName =
		"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";
	const buttonClassName =
		"text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

	return (
		<BasicLayout>
			{/* 제목 */}
			<div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">
				회원가입
			</div>
			{/* 전체 속성 */}
			<div className="w-full grid place-items-center gap-5">
				{/* text + input */}
				{/* 이메일 주소 및 인증 */}
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">이메일 주소</span>
					<div className="flex">
						<input
							name="email"
							type="email"
							value={inputVal.email}
							onChange={handleChange}
							className={`${inputClassName} flex-grow`}
							placeholder="Befree@befree.com"
							required
						/>
						<button className="bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black text-black px-3 py-2 rounded-sm font-['Pretendard-Regular'] text-sm">
							인증
						</button>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<input
						name="verify"
						type="text"
						className={inputClassName}
						placeholder="인증번호를 입력해주세요"
						required
					/>
				</div>
				{/* 비밀번호 */}
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">비밀번호</span>
					<input
						name="password"
						type="password"
						onChange={handleChange}
						value={inputVal.password}
						className={inputClassName}
						placeholder="8자리 이상의 비밀번호"
						required
					/>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">비밀번호 재확인</span>
					<input
						name="password"
						type="password"
						className={inputClassName}
						placeholder="같은 비밀번호를 입력해주세요"
						required
					/>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
					<span className="font-[Pretendard-Regular]">이름</span>
					<input
						name="name"
						type="text"
						value={inputVal.name}
						onChange={handleChange}
						className={inputClassName}
						placeholder="홍길동"
						required
					/>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<button className={buttonClassName} onClick={handleClickRegister}>
						회원가입하기
					</button>
				</div>
				<div className="space-x-16 font-[Pretendard-Regular] mt-4">
					<button>아이디 찾기</button>
					<button>비밀번호 찾기</button>
					<button onClick={moveToLogin}>로그인하기</button>
				</div>
			</div>
		</BasicLayout>
	);
};

export default SignupPage;