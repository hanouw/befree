import React from "react";
import BasicLayout from "../../layouts/BasicLayout";

const LoginPage = () => {
  return (
    <>
      <BasicLayout>
        <div className="font-[Pretendard-Semibold] text-3xl grid place-items-center mt-12">로그인</div>
        <div className=" w-2/3 h-20 grid place-items-center">
          <span>이메일 주소</span>
          <input
            id="title"
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="여행 제목"
            required
          />
          <span>비밀번호</span>
          <input
            id="title"
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="여행 제목"
            required
          />
          <button>로그인하기</button>
        </div>
      </BasicLayout>
    </>
  );
};

export default LoginPage;
