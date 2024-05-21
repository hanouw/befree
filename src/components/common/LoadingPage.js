import React from "react";

const LoadingPage = () => {
  return (
    <div>
      <h4>잠시 기다려주세요</h4>
      <img src={process.env.PUBLIC_URL + "/assets/imgs/spinner.svg"} alt="loading" />
    </div>
  );
};

export default LoadingPage;
