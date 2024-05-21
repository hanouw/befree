import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Main = lazy(() => import("../pages/mainPage"));

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
  ]);
};

export default Router;
