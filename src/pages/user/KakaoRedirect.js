import React, { useEffect } from 'react'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi';
import { login } from '../../slices/loginSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useCustomMove from '../../hooks/useCustomMove';

const KakaoRedirect = () => {

  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const dispatch = useDispatch();

  const { moveToMain } = useCustomMove()

  // 꺼낸 인가코드를 주면서 Access Token 달라고 카카오에 다시 요청
  useEffect(() => {
    console.log("authcode:", authCode)
    getAccessToken(authCode).then((accessToken) => {
      console.log("getAccessToken - access Token : ", accessToken);
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("getMemberWithAccessToken - memberInfo");
        console.log(memberInfo);
        dispatch(login(memberInfo));
        moveToMain()

      });
    });
  }, [authCode]); // authCode값이 변경될때만 요청되도록 useEffect 사용
  return (
    <div></div>
  )
}

export default KakaoRedirect