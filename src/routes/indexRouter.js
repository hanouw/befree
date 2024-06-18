import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import tripRouter from "./tripRouter";

const Main = lazy(() => import("../pages/MainPage"));
// const Main = lazy(() => {
//   return Promise.all([import("../pages/MainPage"), new Promise((resolve) => setTimeout(resolve, 1500))]).then(
//     ([moduleExports]) => moduleExports
//   );
// });
const Info = lazy(() => import("../pages/InfoPage"));

const TripIndex = lazy(() => import("../pages/trip/TripIndex"));
const MyPage = lazy(() => import("../pages/user/MyPage"));
const Modify = lazy(() => import("../pages/user/MyPageModify"));
const Delete = lazy(() => import("../pages/user/MyPageDelete"));
const Login = lazy(() => import("../pages/user/LoginPage"));
const Signup = lazy(() => import("../pages/user/SignupPage"));
const FindPassword = lazy(() => import("../pages/user/FindPassword"));
const CodePage = lazy(() => import("../pages/CodePage"));

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
      // 여행관련
      path: "/trip",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TripIndex />
        </Suspense>
      ),
      children: tripRouter(),
    },
    {
      path: "/mypage",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyPage />
        </Suspense>
      ),
    },
    {
      path: "/modify",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Modify />
        </Suspense>
      ),
    },
    {
      path: "/confirm",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Delete />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/findPassword",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <FindPassword />
        </Suspense>
      ),
    },
    {
      path: "/code",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <CodePage />
        </Suspense>
      ),
    },
  ]);
};

export default Router;
