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
      <div className="grid place-items-center text-3xl m-9">InfoPage</div>
      <div className="hover:cursor-pointer grid place-items-center">
        <div className="mb-2 bg-green-300" onClick={moveToMain}>
          moveToMain
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToTripList}>
          moveToTripList
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToTripListDetail}>
          moveToTripListDetail
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToTripPlanAdd}>
          moveToTripPlanAdd
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToPlaceDetail}>
          moveToPlaceDetail
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToMyPage}>
          moveToMyPage
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToLogin}>
          moveToLogin
        </div>
        <div className="mb-2 bg-green-300" onClick={moveToSignup}>
          moveToSignup
        </div>
      </div>
    </BasicLayout>
  );
};

export default InfoPage;
