import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";
import { useSelector } from "react-redux";
import { modify } from "../../api/memberApi";

const initState = {
  password: "",
  accessToken: "",
  refreshToken: "",
  result: "",
};

const MyPage = () => {
  const [data, setData] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice);
  const [password, setPassword] = useState(initState);
  const { moveToMyPage } = useCustomMove();

  const handleChange = (e) => {
    password[e.target.name] = e.target.value;
    setPassword({ ...password });
    setData({
      ...password,
      accessToken: loginInfo.accessToken,
      refreshToken: loginInfo.refreshToken,
      result: "modify",
    });
  };

  const handleSave = () => {
    modify(data).then(() => {
      alert("변경되었습니다.");
      moveToMyPage();
    });
  };

  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";
  const buttonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

  const emptyButtonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center border border-my-color-lightgreen hover:bg-my-color-superlightgreen focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5 bg-white";

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-44 mb-12">
        회원 정보 수정
      </div>
      <div className="w-full grid place-items-center gap-5 mb-48">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소</span>
          <input
            name="email"
            type="email"
            className={inputClassName}
            value={loginInfo.email}
            disabled
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
          <span className="font-[Pretendard-Regular]">비밀번호</span>
          <input
            name="password"
            type="password"
            className={inputClassName}
            placeholder="8자 이상의 영문+숫자 조합의 새로운 비밀번호를 입력해주세요."
            onChange={handleChange}
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 flex gap-10">
          <button className={emptyButtonClassName} onClick={moveToMyPage}>
            돌아가기
          </button>
          <button className={buttonClassName} onClick={handleSave}>
            저장하기
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
