import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPageNoBasicLayout";

const TripList = lazy(() => import("../pages/trip/TripList"));
const TripListDetail = lazy(() => import("../pages/trip/TripListDetail"));
const TripListDetailModify = lazy(() =>
  import("../pages/trip/TripListDetailModify")
);
const TripplanAdd = lazy(() => import("../pages/trip/TripPlanAdd"));
const PlaceDetail = lazy(() => import("../pages/trip/PlaceDetail"));

const tripRouter = () => {
  return [
    {
      path: "list", // 여행 계획 목록 - 이전 여행 및 클릭해서 새로운 여행 계획하기 페이지
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripList />
        </Suspense>
      ),
    },
    {
      path: "listdetail/:tid", // 여행 상세 - 여행 계획짜기
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripListDetail />
        </Suspense>
      ),
    },
    {
      path: "listdetailmodify/:tid", // 여행 상세 - 여행 계획짜기
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripListDetailModify />
        </Suspense>
      ),
    },
    {
      path: "planadd/:tid", // 여행에 여행지 추가
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripplanAdd />
        </Suspense>
      ),
    },
    {
      path: "placedetail/:contentId/:contentTypeId", // 여행지 상세
      element: (
        <Suspense fallback={<LoadingPage />}>
          <PlaceDetail />
        </Suspense>
      ),
    },
  ];
};

export default tripRouter;
