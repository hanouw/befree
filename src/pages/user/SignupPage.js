import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import useCustomMove from "../../hooks/useCustomMove";

const SignupPage = () => {
  const { moveToLogin } = useCustomMove();

  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";
  const buttonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

  return (
    <BasicLayout>
      {/* 제목 */}
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-12 mb-12">회원가입</div>
      {/* 전체 속성 */}
      <div className="w-full grid place-items-center gap-5">
        {/* text + input */}
        {/* 이메일 주소 및 인증 */}
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소</span>
          <div className="flex">
            <input
              id="email"
              name="email"
              type="email"
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
            id="verify"
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
            id="password"
            name="password"
            type="password"
            className={inputClassName}
            placeholder="8자리 이상의 비밀번호"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">비밀번호 재확인</span>
          <input
            id="password"
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
            id="password"
            name="password"
            type="password"
            className={inputClassName}
            placeholder="홍길동"
            required
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <button className={buttonClassName}>회원가입하기</button>
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
