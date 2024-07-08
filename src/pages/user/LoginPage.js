import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { moveToSignup, moveToMain, moveToFindPassword } = useCustomMove();
  const { execLogin } = useCustomLogin();

  const [loginParam, setLoginParam] = useState({ ...initState });

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = () => {
    execLogin(loginParam).then((data) => {
      if (data.error) {
        alert("이메일과 비밀번호를 다시 확인하세요!");
      } else {
        moveToMain();
      }
    });
  };

  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";
  const buttonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-36 mb-12">
        로그인
      </div>
      <div className="w-full grid place-items-center gap-5 mb-20">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소</span>
          <input
            name="email"
            type="email"
            value={loginParam.email}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Befree@befree.com"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
          <span className="font-[Pretendard-Regular]">비밀번호</span>
          <input
            name="password"
            type="password"
            value={loginParam.password}
            onChange={handleChange}
            className={inputClassName}
            placeholder="4자리 이상의 비밀번호"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <button className={buttonClassName} onClick={handleClickLogin}>
            로그인하기
          </button>
        </div>
        <div className="space-x-16 font-[Pretendard-Regular] mt-4">
          <button onClick={moveToFindPassword}>비밀번호 찾기</button>
          <button onClick={moveToSignup}>회원가입</button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
