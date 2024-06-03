import axios from "axios";

export const disableData = async () => {
  // 컨텐츠ID가 “129619”인 무장애여행 정보 조회
  const response = await axios.get(
    "http://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&contentId=129619&MobileOS=ETC&MobileApp=AppTest&_type=json"
  );
  return response.data;
};

// 위치기반 (좌표)
// 키워드 (지역코드)
// 무장애

export const keywordData = async (pageNo, arrange, keyword, contentTypeId, areaCode, sigunguCode, cat1, cat2) => {
  const dataList = [pageNo, arrange, keyword, contentTypeId, areaCode, sigunguCode, cat1, cat2];
  const dataListStr = ["pageNo", "arrange", "keyword", "contentTypeId", "areaCode", "sigunguCode", "cat1", "cat2"];

  let requestLink =
    "http://apis.data.go.kr/B551011/KorWithService1/searchKeyword1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D" +
    "&numOfRows=12" +
    "&MobileOS=ETC" +
    "&listYN=Y" +
    "&_type=json";
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i]) {
      requestLink = requestLink + `&${dataListStr[i]}=${dataList[i]}`;
    }
  }
  console.log(requestLink);
  const response = await axios.get(requestLink);
  return response.data;
};

export const placeData = async () => {
  // 지역이 대구 동구에 있는 문화시설 관광정보 조회
  //   목록구분(Y=목록, N=개수)
  // 정렬구분 (A=제목순,C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
  // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
  //   지역코드
  {
    /* <option value="">전체</option>
    <option value="1">서울</option>
    <option value="6">부산</option>
    <option value="4">대구</option>
    <option value="2">인천</option>
    <option value="5">광주</option>
    <option value="3">대전</option>
    <option value="7">울산</option>
    <option value="8">세종</option>
    <option value="31">경기</option>
    <option value="32">강원</option>
    <option value="33">충북</option>
    <option value="34">충남</option>
    <option value="35">경북</option>
    <option value="36">경남</option>
    <option value="37">전북</option>
    <option value="38">전남</option>
    <option value="39">제주</option> */
  }
  // 시군구코드(지역코드 필수)
  const response = await axios.get(
    `http://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&pageNo=1&numOfRows=12&listYN=Y&arrange=A&contentTypeId=14&areaCode=4&sigunguCode=4&MobileOS=ETC&MobileApp=AppTest&_type=json`
    // `http://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&${(pageNo = 1)}&numOfRows=12&listYN=Y&arrange=A&contentTypeId=14&areaCode=4&sigunguCode=4&MobileOS=ETC&MobileApp=AppTest&_type=json`
  );
  return response.data;
};

// 지역이 경북에 있는 모든타입 관광정보 조회 (한페이지에 10개씩, 첫페이지며, 리스트를 제목순으로 조회)
// http://apis.data.go.kr/B551011/KorWithService1/areaBasedList1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&areaCode=35&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest

//※내주변 좌표(서울 한국관광공사 주변)에서 1000m 이내에 있는 모든타입의 관광정보 조회
//http://apis.data.go.kr/B551011/KorWithService1/locationBasedList1?serviceKey=인증키&pageNo=1&numOfRows=10&mapX=126.981611&mapY=37.568477&radius=1000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest

// ※키워드통합검색 : 키워드가 "강원"인 관광정보를 검색하여 리스트로 조회
// http://apis.data.go.kr/B551011/KorWithService1/searchKeyword1?serviceKey=인증키&keyword=%EA%B0%95%EC%9B%90&MobileOS=ETC&MobileApp=AppTest&arrange=A

// ※컨텐츠ID가 “252581”인 관광정보의 “기본정보”만 조회
// http://apis.data.go.kr/B551011/KorWithService1/detailCommon1?serviceKey=인증키&contentId=252581&defaultYN=Y&MobileOS=ETC&MobileApp=AppTest

// ※컨텐츠ID가 “252581”인 관광정보의 “기본정보”, “주소”, “개요” 정보를 조회
// http://apis.data.go.kr/B551011/KorWithService1/detailCommon1?serviceKey=인증키&contentId=252581&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&MobileOS=ETC&MobileApp=AppTest
