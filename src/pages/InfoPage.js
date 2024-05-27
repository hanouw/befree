import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomMove from "../hooks/useCustomMove";

const InfoPage = () => {
  const {
    moveToMain,
    moveToTripList,
    moveToTripListDetail,
    moveToTripPlanAdd,
    moveToPlaceDetail,
    moveToMyPage,
    moveToLogin,
    moveToSignup,
  } = useCustomMove();
  return (
    <BasicLayout>
      InfoPage
      <div className="bg-orange-300">
        <div onClick={moveToMain}>moveToMain</div>
        <div onClick={moveToTripList}>moveToTripList</div>
        <div onClick={moveToTripListDetail}>moveToTripListDetail</div>
        <div onClick={moveToTripPlanAdd}>moveToTripPlanAdd</div>
        <div onClick={moveToPlaceDetail}>moveToPlaceDetail</div>
        <div onClick={moveToMyPage}>moveToMyPage</div>
        <div onClick={moveToLogin}>moveToLogin</div>
        <div onClick={moveToSignup}>moveToSignup</div>
      </div>
    </BasicLayout>
  );
};

export default InfoPage;
