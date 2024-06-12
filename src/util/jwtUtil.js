import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookieUtil";
import { BEFREE_API_SERVER_HOST } from "../api/befreeApi";

// 1. 액세스 토큰 만료 시 자동 재발급
// 2. 요청 및 응답 인터셉터 활용:
// 요청 및 응답을 가로채서 처리하는 인터셉터를 사용하여 인증 헤더 추가, 토큰 재발급, 오류 처리 등을 수행

// 로그인 상태에서 요청보낼때 사용
const jwtAxios = axios.create();

// 토큰 갱신 함수
const refreshJWT = async (accessToken, refreshToken) => {
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const response = await axios.get(`${BEFREE_API_SERVER_HOST}/member/refresh?refreshToken=${refreshToken}`, header);
  console.log("*******************");
  console.log(response.data);
  return response.data;
};

// request 전
const beforeReq = (config) => {
  console.log("before request");
  // member 쿠키꺼내기
  const memberInfo = getCookie("member");
  // 쿠키 없을때 예외 발생
  if (!memberInfo) {
    console.log("Member Cookie Not found");
    return Promise.reject({
      response: { data: { error: "REQUIRE_LOGIN" } },
    });
  }
  // 쿠키가 있을 경우 실행되는 코드
  const { accessToken } = memberInfo; // accessToken 꺼내기
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};
// request 실패
const requestFail = (error) => {
  console.log("request error");
  return Promise.reject(error);
};
// response 전
const beforeRes = async (res) => {
  console.log("before return response");
  console.log(res);
  const data = res.data; // API 서버에서 보내준 응답 데이터
  if (data.error) {
    const memberCookie = getCookie("member");
    const result = await refreshJWT(memberCookie.accessToken, memberCookie.refreshToken);
    console.log("refreshed token : ", result);
    // 쿠키의 토큰값 갱신
    memberCookie.accessToken = result.accessToken;
    memberCookie.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(memberCookie), 1);
    // 원래 처음 요청한 정보 꺼내서, Access, Refresh Token 갱신 뒤 재요청
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return await axios(originalRequest);
  }
  return res;
};
// response 실패
const responseFail = (error) => {
  console.log("response fail");
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
