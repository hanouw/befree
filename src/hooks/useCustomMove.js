import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();

  const moveToBack = () => {
    navigate(-1);
  };

  // =========================================================================== 여행 관련 페이지

  // 현재 페이지를 다시 클릭해도 서버 호출이 되도록 도와주는 state값
  const [refresh, setRefresh] = useState(false);

  // 메인 페이지로 이동 : default 페이지로이동
  const moveToMain = () => {
    navigate({ pathname: "/" });
  };

  // 여행계획 목록으로 이동
  const moveToTripList = () => {
    navigate({ pathname: "/trip/list" });
  };

  // 여행 계획 상세로 이동
  const moveToTripListDetail = (tid, title, date, region, shared) => {
    navigate(
      { pathname: `/trip/listdetail/${tid}` },
      {
        state: {
          tid: `${tid}`,
          title: `${title}`,
          date: `${date}`,
          region: `${region}`,
          shared: `${shared}`,
        },
      }
    );
  };

  // 여행 계획 수정으로 이동
  const moveToTripListDetailModify = (tid, title, date, region) => {
    navigate(
      { pathname: `/trip/listdetailmodify/${tid}` },
      {
        state: {
          tid: `${tid}`,
          title: `${title}`,
          date: `${date}`,
          region: `${region}`,
        },
      }
    );
  };

  // 여행 계획 추가로 이동
  const moveToTripPlanAdd = (tid, title, date, region) => {
    navigate(
      { pathname: `/trip/planadd/${tid}` },
      {
        state: {
          tid: `${tid}`,
          title: `${title}`,
          date: `${date}`,
          region: `${region}`,
        },
      }
    );
  };

  // 여행지 상세로 이동
  const moveToPlaceDetail = (contentId, contentTypeId) => {
    navigate({ pathname: `/trip/placedetail/${contentId}/${contentTypeId}` });
  };

  // =========================================================================== 유저 관련 페이지

  // 내 페이지로 이동
  const moveToMyPage = () => {
    navigate({ pathname: `/mypage` });
  };
  // 로그인 페이지로 이동
  const moveToLogin = () => {
    navigate({ pathname: `/login` });
  };
  // 회원가입으로 이동
  const moveToSignup = () => {
    navigate({ pathname: `/signup` });
  };
  // 회원정보 변경페이지로 이동
  const moveToModify = () => {
    navigate({ pathname: `/modify` });
  };
  // 회원 삭제 확인 페이지로 이동
  const moveToDelete = (val) => {
    console.log("movaeTodelete val:", val);
    navigate({ pathname: `/confirm` }, { state: { val: `${val}` } });
  };
  // 회원 비밀번호찾기 페이지로 이동
  const moveToFindPassword = () => {
    navigate({ pathname: `/findPassword` });
  };

  // =========================================================================== 코드 관련 페이지

  const moveToCodePage = (pageName) => {
    navigate(
      { pathname: `/code` },
      {
        state: {
          pageName: pageName,
        },
      }
    );
  };

  // 각 이동 함수를 리턴
  return {
    moveToBack,
    moveToMain,
    moveToTripList,
    moveToTripListDetail,
    moveToTripListDetailModify,
    moveToTripPlanAdd,
    moveToPlaceDetail,
    moveToMyPage,
    moveToLogin,
    moveToSignup,
    moveToModify,
    moveToDelete,
    moveToFindPassword,
    moveToCodePage,
    refresh,
    moveToCodePage,
  };
};

export default useCustomMove;
