import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

// email에 해당하는 값이 있으면 로그인상태, 없으면 비로그인상태로 간주
const initState = {
  email: "",
};

// 쿠키있는지 확인 함수 추가
const getMemberCookie = () => {
  const memberInfo = getCookie("member");
  //console.log("memberInfo", memberInfo)
  if (memberInfo && memberInfo.name) {
    // 한글깨짐 대비
    memberInfo.name = decodeURIComponent(memberInfo.name);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  (useParams) => {
    return loginPost(useParams);
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: getMemberCookie() || initState,
  reducers: {
    // 동기작업 처리
    login: (state, action) => {
      const data = action.payload;
      setCookie("member", JSON.stringify(data), 1);
      // 새로운 리덕스 스토어에 수정할 새로운 상태값 리턴
      return data;
    },
    logout: (state, action) => {
      //console.log("loginSlice logout 실행")
      removeCookie("member");
      return { ...initState };
    },
  },
  //비동기 작업 처리
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        //console.log("fulfilled");
        const payload = action.payload;
        // 정상 처리시에만 쿠키 생성
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        //console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        //console.log("rejected");
      });
  },
});

// 액션크리에이터 외부로 내보내기
export const { login, logout } = loginSlice.actions;
// 리듀서 내보내기 -> configureStore에 등록가능하도록
export default loginSlice.reducer;
