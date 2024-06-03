import { useDispatch, useSelector } from "react-redux";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { createSearchParams, useNavigate } from "react-router-dom";

const useCustomLogin = () => {
	const dispatch = useDispatch(); // 리덕스 state 값 변경해라~
	const navigate = useNavigate(); // 페이지 이동 시

	// 로그인 상태 값 : 리덕스 지정한 슬라이스 state값 가져와라~
	const loginState = useSelector((state) => state.loginSlice);
	// 로그인 여부
	const isLogin = loginState.email ? true : false;

	// 로그인 함수
	const execLogin = async (loginParam) => {
		const action = await dispatch(loginPostAsync(loginParam));
		return action.payload;
	};

	// 로그아웃 함수
	const execLogout = async () => {
		dispatch(logout());
	};

	// 예외 처리 함수(토큰 문제 등)
	const exceptionHandle = (ex) => {
		console.log("exceptionHandle...........");
		console.log(ex);
		const errorMsg = ex.response.data.error;
		// 쿼리스트링 구조 문자열로 만들어주는 함수
		const errorStr = createSearchParams({ error: errorMsg }).toString();
		if (errorMsg === "REQUIRE_LOGIN") {
			alert("로그인이 필요합니다");
			// 에러메세지 포함해서 로그인폼으로 이동
			navigate({ pathname: "/member/login", search: errorStr });
			return;
		}
		if (ex.response.data.error === "ERROR_ACCESS_DENIED") {
			alert("해당 메뉴를 사용할 수 있는 권한이 없습니다");
			navigate({ pathname: "/", search: errorStr });
			return;
		}
	};

	return {
		loginState,
		isLogin,
		execLogin,
		execLogout,
		exceptionHandle,
	};
};

export default useCustomLogin;
