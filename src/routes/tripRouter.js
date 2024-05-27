import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const TripListDetail = lazy(() => import("../pages/tripList/TripListDetail"));
const TripplanAdd = lazy(() => import("../pages/tripList/TripPlanAdd"));
const PlaceDetail = lazy(() => import("../pages/tripList/PlaceDetail"));

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
