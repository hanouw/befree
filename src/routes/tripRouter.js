import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const TripListDetail = lazy(() => import("../pages/tripList/tripListDetail"));
const TripplanAdd = lazy(() => import("../pages/tripList/tripPlanAdd"));
const PlaceDetail = lazy(() => import("../pages/tripList/placeDetail"));

const tripRouter = () => {
  return [
    {
      path: "listdetail",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripListDetail />
        </Suspense>
      ),
    },
    {
      path: "planadd",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripplanAdd />
        </Suspense>
      ),
    },
    {
      path: "placedetail",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <PlaceDetail />
        </Suspense>
      ),
    },
  ];
};

export default tripRouter;
