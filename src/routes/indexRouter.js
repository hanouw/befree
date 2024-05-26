import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import tripRouter from "./tripRouter";

const Main = lazy(() => {
  return Promise.all([import("../pages/mainPage"), new Promise((resolve) => setTimeout(resolve, 500))]).then(
    ([moduleExports]) => moduleExports
  );
});

const TripList = lazy(() => import("../pages/tripList/tripList"));
const MyPage = lazy(() => import("../pages/user/myPage"));
const Login = lazy(() => import("../pages/user/loginPage"));
const Signup = lazy(() => import("../pages/user/signupPage"));

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
