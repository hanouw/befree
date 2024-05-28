import React from "react";
import BasicLayout from "../../layouts/BasicLayout";

const LoadingPage = () => {
  return (
    <BasicLayout>
      <div className="grid place-content-center mt-20">
        <div className="font-[Pretendard-SemiBold] text-xl text-center">잠시 기다려주세요</div>
        <img src={process.env.PUBLIC_URL + "/assets/imgs/spinner.svg"} alt="loading" />
      </div>
    </BasicLayout>
  );
};

export default LoadingPage;
