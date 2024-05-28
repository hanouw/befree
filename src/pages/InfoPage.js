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
    moveToDelete,
    moveToModify,
  } = useCustomMove();
  return (
    <BasicLayout>
      <div className="grid place-items-center text-3xl m-9">InfoPage</div>
      <div className="hover:cursor-pointer grid place-items-center">
        <div className="mb-2 bg-my-color-beige" onClick={moveToMain}>
          moveToMain
        </div>
        <div className="mb-2 bg-my-color-beige" onClick={moveToTripList}>
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
        <div className="mb-2 bg-my-color-beige" onClick={moveToMyPage}>
          moveToMyPage
        </div>
        <div className="mb-2 bg-my-color-beige" onClick={moveToLogin}>
          moveToLogin
        </div>
        <div className="mb-2 bg-my-color-beige" onClick={moveToSignup}>
          moveToSignup
        </div>
        <div className="mb-2 bg-my-color-beige" onClick={moveToDelete}>
          moveToDelete
        </div>
        <div className="mb-2 bg-my-color-beige" onClick={moveToModify}>
          moveToModify
        </div>
      </div>
    </BasicLayout>
  );
};

export default InfoPage;
