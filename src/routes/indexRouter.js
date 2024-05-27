import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import tripRouter from "./tripRouter";

const Main = lazy(() => import("../pages/MainPage"));
const Info = lazy(() => import("../pages/InfoPage"));

const TripList = lazy(() => import("../pages/tripList/TripList"));
const MyPage = lazy(() => import("../pages/user/MyPage"));
const Login = lazy(() => import("../pages/user/LoginPage"));
const Signup = lazy(() => import("../pages/user/SignupPage"));

// 경로 매핑하는 곳 (root)
const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "/info",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Info />
        </Suspense>
      ),
    },
    {
      path: "trip",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripList />
        </Suspense>
      ),
      children: tripRouter(),
    },
    {
      path: "mypage",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyPage />
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signup />
        </Suspense>
      ),
    },
  ]);
};

export default Router;
