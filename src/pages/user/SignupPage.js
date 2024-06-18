import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";
import { register, sendEmail } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCookie, removeCookie, setCookie } from "../../util/cookieUtil";
import TripAddLoadingModalComponent from "../../components/tripPlanAdd/TripAddLoadingModalComponent";

const initState = {
	email: "",
	password: "",
	name: "",
	verify: "",
	passwordVerify: "",
};

const SignupPage = () => {
	const { moveToLogin, moveToMain, moveToFindPassword } = useCustomMove();
	const { execLogin } = useCustomLogin();

	const [inputVal, setInputVal] = useState({ ...initState });
	const [keyResult, setKeyResult] = useState(false);
	const [pwResult, setPwResult] = useState(false);
	const [emailValid, setEmailValid] = useState(false);
	const [isSending, setIsSending] = useState(false);

	const handleChange = (e) => {
		inputVal[e.target.name] = e.target.value;
		setInputVal({ ...inputVal });

		if (e.target.name == "email") {
			validateEmail(e.target.value);
			validateVerifyEmail(e.target.value);
		}

		if (e.target.name === "password" || e.target.name === "passwordVerify") {
			validatePassword();
		}
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setEmailValid(emailRegex.test(email));
	};

	const validatePassword = () => {
		const { password, passwordVerify } = inputVal;
		if (password.length >= 4 && password === passwordVerify) {
			setPwResult(true);
		} else {
			setPwResult(false);
		}
	};

	const validateVerifyEmail = (email) => {
		const cookie = getCookie("emailVerify");
		if (cookie) {
			if (cookie.email !== email) {
				setKeyResult(false);
			}
		}
	};

	const handleSendEmail = () => {
		console.log("이메일 전송 클릭");
		if (!inputVal.email) {
			alert("이메일을 입력해주세요");
			return;
		}

		if (!emailValid) {
			alert("유효한 이메일 주소를 입력해주세요.");
			return;
		}

		setIsSending(true);
		const data = { email: inputVal.email };

		sendEmail(data).then((response) => {
			setIsSending(false);
			if (response.key) {
				setCookie(
					"emailVerify",
					{ key: response.key, email: response.email },
					1
				);
				console.log(response.key);
				alert("이메일이 전송되었습니다.");
			} else {
				alert("이미 가입된 회원입니다. 로그인을 해주세요!");
				moveToLogin();
			}
		});
	};

	const handleClickVerify = () => {
		if (inputVal.verify == null) {
			alert("인증번호를 다시 확인해주세요.");
			return;
		}
		const cookie = getCookie("emailVerify");
		if (cookie) {
			console.log("handleClickVerify 실행 key:", cookie.key);
			if (inputVal.verify == cookie.key && inputVal.email == cookie.email) {
				console.log(inputVal.verify, inputVal.email);
				alert("인증 성공!");
				setKeyResult(true);
			} else {
				alert("인증번호를 다시 확인해주세요");
			}
		} else {
			alert("인증번호를 다시 확인해주세요");
		}
	};

	// const passwordCheck = () => {
	// 	console.log("passwordCheck", inputVal.password.length);
	// };

	const handleClickRegister = () => {
		// passwordCheck();
		if (!keyResult) {
			alert("이메일 인증을 해주세요.");
			return;
		}
		if (!pwResult) {
			if (inputVal.password.length < 4) {
				setPwResult(false);
				console.log(pwResult);
				alert("4자리 이상의 비밀번호를 입력해주세요.");
				return;
			}
			if (inputVal.password !== inputVal.passwordVerify) {
				alert("비밀번호가 일치하지 않습니다.");
				setPwResult(false);
			} else {
				setPwResult(true);
			}
		}
		console.log("pwResult keyResult", pwResult, keyResult);
		if (pwResult && keyResult) {
			register({
				email: inputVal.email,
				password: inputVal.password,
				name: inputVal.name,
			}).then((data) => {
				console.log(data);
				if (data.error) {
					alert("회원가입을 실패하였습니다. 다시 시도해주세요.");
				} else {
					execLogin({ email: inputVal.email, password: inputVal.password });
					removeCookie("emailVerify");
					alert("회원가입을 성공하였습니다.");
					moveToMain();
				}
			});
		}
	};

	const inputClassName =
		"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";
	const buttonClassName =
		"text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

	return (
		<BasicLayout>
			{isSending ? <TripAddLoadingModalComponent /> : <></>}
			<div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">
				회원가입
			</div>
			<div className="w-full grid place-items-center gap-5">
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">
						이메일 주소<span className="text-red-500 text-sm"> 필수</span>
					</span>
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
						<button
							onClick={handleSendEmail}
							className="bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black text-black px-3 py-2 rounded-sm font-['Pretendard-Regular'] text-sm"
						>
							인증
						</button>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<div className="flex">
						<input
							name="verify"
							type="text"
							className={inputClassName}
							placeholder="인증번호를 입력해주세요"
							value={inputVal.verify}
							onChange={handleChange}
							required
						/>
						<button
							onClick={handleClickVerify}
							className="bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black text-black px-3 py-2 rounded-sm font-['Pretendard-Regular'] text-sm"
						>
							확인
						</button>
					</div>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">
						비밀번호<span className="text-red-500 text-sm"> 필수</span>
					</span>
					<input
						name="password"
						type="password"
						onChange={handleChange}
						value={inputVal.password}
						className={inputClassName}
						placeholder="4자리 이상의 비밀번호"
						required
					/>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">
						비밀번호 재확인<span className="text-red-500 text-sm"> 필수</span>
					</span>
					<input
						name="passwordVerify"
						type="password"
						onChange={handleChange}
						value={inputVal.passwordVerify}
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
					<button onClick={moveToFindPassword}>비밀번호 찾기</button>
					<button onClick={moveToLogin}>로그인하기</button>
				</div>
			</div>
		</BasicLayout>
	);
};

export default SignupPage;
