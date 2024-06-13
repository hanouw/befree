import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";
import { sendEmail, sendNewPassword } from "../../api/memberApi";

const FindPassword = () => {
	const inputClassName =
		"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";

	const buttonClassName =
		"text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

	const emptyButtonClassName =
		"text-center w-full text-gray-900 inline-flex justify-center items-center border border-my-color-lightgreen hover:bg-my-color-superlightgreen focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5 bg-white";

	const { moveToLogin, moveToMain } = useCustomMove();

	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState(false);
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(email));
    };

	const handleChange = (e) => {
		setEmail(e.target.value);
		validateEmail(e.target.value);
	};

	const handleClick = () => {
		console.log("email:", email);

		if (!emailValid) {
			alert("유효한 이메일 주소를 입력해주세요.");
			return;
		}
    
		sendNewPassword({ email: email }).then((result) => {
			console.log("newPassword Result:", result);
			alert(
				"이메일이 발송되었습니다. 새로운 비밀번호로 로그인후, 비밀번호 변경을 해주세요."
			);
			moveToLogin();
		});
	};

	return (
		<BasicLayout>
			<div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-44 mb-12">
				이메일 주소로 새로운 비밀번호가 발송됩니다.
			</div>
			<div className="w-full grid place-items-center gap-5 mb-56">
				<div className="w-full sm:w-1/2 md:w-1/3 px-4">
					<span className="font-[Pretendard-Regular]">이메일 주소</span>
					<input
						name="email"
						type="email"
						value={email}
						onChange={handleChange}
						className={inputClassName}
					/>
				</div>
				<div className="w-full sm:w-1/2 md:w-1/3 px-4 flex gap-10">
					<button className={emptyButtonClassName} onClick={moveToMain}>
						돌아가기
					</button>
					<button className={buttonClassName} onClick={handleClick}>
						확인
					</button>
				</div>
			</div>
		</BasicLayout>
	);
};

export default FindPassword;
