import axios from "axios";

// 이미지 드래그 못하게 하는 style
const noDrag = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "-moz-none",
  msUserSelect: "none",
  KhtmlUserSelect: "none",
  userDrag: "none",
  WebkitUserDrag: "none",
  KhtmlUserDrag: "none",
  MozUserDrag: "-moz-none",
  msUserDrag: "none",
};

// 무장애 기반
export const disableData = async () => {
  // 컨텐츠ID가 “129619”인 무장애여행 정보 조회
  const response = await axios.get(
    "http://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&contentId=129619&MobileOS=ETC&MobileApp=AppTest&_type=json"
  );
  return response.data;
};

// 지역 또는 키워드 기반
export const placeKeywordData = async (
  pageNo,
  arrange,
  keyword,
  contentTypeId,
  areaCode,
  sigunguCode,
  cat1,
  cat2
) => {
  const final = () => {
    const dataList = [
      pageNo,
      arrange,
      keyword,
      contentTypeId,
      areaCode,
      sigunguCode,
      cat1,
      cat2,
    ];
    const dataListStr = [
      "pageNo",
      "arrange",
      "keyword",
      "contentTypeId",
      "areaCode",
      "sigunguCode",
      "cat1",
      "cat2",
    ];

    let keyUrl = null;

    if (keyword) {
      keyUrl = "searchKeyword1";
    } else {
      keyUrl = "areaBasedList1";
    }

    let requestLink =
      `http://apis.data.go.kr/B551011/KorWithService1/${keyUrl}?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D` +
      "&numOfRows=12" +
      "&MobileOS=ETC" +
      "&listYN=Y" +
      "&_type=json" +
      "&MobileApp=befree";

    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i]) {
        requestLink = requestLink + `&${dataListStr[i]}=${dataList[i]}`;
      }
    }
    return requestLink;
  };
  const requestLink = final();
  if (requestLink) {
    return (await axios.get(requestLink)).data;
  }
};

// 위 API를 필터링 해서 가져오기
// API 전송 함수
export const sendPlaceKeywordDataApi = async (recentResult) => {
  console.log(recentResult);
  const data = await placeKeywordData(
    1, // pageNo
    recentResult.imgNece || "A", //arrange
    recentResult.keywordVal, //keyword
    recentResult.category, //contentTypeId
    recentResult.region, //areaCode
    null, //sigunguCode
    null, //cat1
    null //cat2
  );

  console.log("TripPlanAdd placeKeywordData 실행됨");
  console.log(data);
  const result = data.response.body.items.item;

  // 지도 만들기
  const newMap = []; // 새로운 배열 생성
  if (data.response.body.numOfRows != 0) {
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      const mapObj = {
        mapx: item.mapx,
        mapy: item.mapy,
        title: item.title,
      };
      newMap.push(mapObj);
    }
  }

  let newTripList = [];

  for (let i = 0; i < data.response.body.numOfRows; i++) {
    const item = result[i];
    const tempPlace = {
      src:
        item.firstimage ||
        item.firstimage2 ||
        process.env.PUBLIC_URL + "/assets/imgs/defaultImageStroke.png",
      alt: `${item.contentid}`,
      title: item.title,
      address: item.addr1,
      style: noDrag,
    };
    newTripList.push(tempPlace);
  }
  const returnValue = {
    newTripList: newTripList,
    numOfRows: data.response.body.numOfRows,
    newMap: newMap,
  };

  console.log(returnValue);

  return returnValue;
};

//※내주변 좌표(서울 한국관광공사 주변)에서 1000m 이내에 있는 모든타입의 관광정보 조회
//http://apis.data.go.kr/B551011/KorWithService1/locationBasedList1?serviceKey=인증키&pageNo=1&numOfRows=10&mapX=126.981611&mapY=37.568477&radius=1000&listYN=Y&arrange=A&MobileOS=ETC&MobileApp=AppTest

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

export const getGuList = async () => {
  const areaId = [1, 6, 4, 2, 5, 3, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39];

  let result = [];

  for (let i = 0; i < 17; i++) {
    let requestLink = `http://apis.data.go.kr/B551011/KorWithService1/areaCode1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&areaCode=${areaId[i]}&numOfRows=35&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    await axios.get(requestLink).then((response) => {
      result.push(response);
    });
  }
  return result;
};
