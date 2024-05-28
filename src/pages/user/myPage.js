import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";

const MyPage = () => {
  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";
  const buttonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

  const emptyButtonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center border border-my-color-lightgreen hover:bg-my-color-superlightgreen focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5 bg-white";

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">로그인</div>
      <div className="w-full grid place-items-center gap-5">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소</span>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClassName}
            placeholder="Befree@befree.com"
            disabled
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
          <span className="font-[Pretendard-Regular]">비밀번호</span>
          <input
            id="password"
            name="password"
            type="password"
            className={inputClassName}
            placeholder="8자리 이상의 비밀번호"
            value={"********"}
            disabled
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 flex gap-10">
          <button className={emptyButtonClassName}>회원 탈퇴</button>
          <button className={buttonClassName}>정보수정</button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
