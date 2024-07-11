import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

const Main = lazy(() => import("../pages/MainPage"));
// const Main = lazy(() => {
//   return Promise.all([import("../pages/MainPage"), new Promise((resolve) => setTimeout(resolve, 1500))]).then(
//     ([moduleExports]) => moduleExports
//   );
// });
const Info = lazy(() => import("../pages/InfoPage"));

const MyPage = lazy(() => import("../pages/user/MyPage"));
const Modify = lazy(() => import("../pages/user/MyPageModify"));
const Delete = lazy(() => import("../pages/user/MyPageDelete"));
const Login = lazy(() => import("../pages/user/LoginPage"));
const Signup = lazy(() => import("../pages/user/SignupPage"));
const FindPassword = lazy(() => import("../pages/user/FindPassword"));
const TripSharedList = lazy(() => import("../pages/trip/TripSharedList"));
const TripList = lazy(() => import("../pages/trip/TripList"));
const TripListDetail = lazy(() => import("../pages/trip/TripListDetailHoriz"));
const TripListDetailModify = lazy(() =>
	import("../pages/trip/TripListDetailModifyHoriz")
);
const TripplanAdd = lazy(() => import("../pages/trip/TripPlanAdd"));
const PlaceDetail = lazy(() => import("../pages/trip/PlaceDetail"));
const KakaoRedirect = lazy(() => import("../pages/user/KakaoRedirect"))
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
			path: "/shared", // 공유된 여행 계획 목록
			element: (
				<Suspense fallback={<LoadingPage />}>
					<TripSharedList />
				</Suspense>
			),
		},
		////////////////////////////////////////////// 여행관련
		{
			path: "/trip/list", // 여행 계획 목록 - 이전 여행 및 클릭해서 새로운 여행 계획하기 페이지
			element: (
				<Suspense fallback={<LoadingPage />}>
					<TripList />
				</Suspense>
			),
		},
		{
			path: "/trip/listdetail/:tid", // 여행 상세 - 여행 계획짜기
			element: (
				<Suspense fallback={<LoadingPage />}>
					<TripListDetail />
				</Suspense>
			),
		},
		{
			path: "/trip/listdetailmodify/:tid", // 여행 상세 - 여행 계획짜기
			element: (
				<Suspense fallback={<LoadingPage />}>
					<TripListDetailModify />
				</Suspense>
			),
		},
		{
			path: "/trip/planadd/:tid", // 여행에 여행지 추가
			element: (
				<Suspense fallback={<LoadingPage />}>
					<TripplanAdd />
				</Suspense>
			),
		},
		{
			path: "/trip/placedetail/:contentId/:contentTypeId", // 여행지 상세
			element: (
				<Suspense fallback={<LoadingPage />}>
					<PlaceDetail />
				</Suspense>
			),
		},
		//////////////////////////////// 마이페이지
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
		{
			path: "/error",
			element: (
				<ErrorPage />
			),
		},
		{
			path: "/redirect",
			element: (
				<Suspense fallback={<LoadingPage />}>
					<KakaoRedirect />
				</Suspense>
			),
		},
	]);
};

export default Router;
