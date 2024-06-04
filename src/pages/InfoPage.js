import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomMove from "../hooks/useCustomMove";
import axios from "axios";

const InfoPage = () => {
  const areaId = [1, 6, 4, 2, 5, 3, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39];

  const [guName, setGuName] = useState([]);

  for (let i = 0; i < areaId.length; i++) {
    let requestLink = `http://apis.data.go.kr/B551011/KorWithService1/areaCode1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&areaCode=${areaId}&numOfRows=35&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    // const areaData = async () => {
    //   setGuName(await axios.get(requestLink));
    // };
  }

  // const response = areaData;

  return (
    <BasicLayout>
      <div className="grid place-items-center text-3xl m-9">InfoPage</div>
      <div className="hover:cursor-pointer grid place-items-center"></div>
    </BasicLayout>
  );
};

export default InfoPage;
