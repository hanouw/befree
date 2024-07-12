import axios from "axios";

const serviceKey =
  "uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D";
// const serviceKey =
// "K2%2FtyPnwaOZfrMCvSUG10bEQaU8GaFxghNI2voZCpUhGx2UALE2Hn3aXUw4cc0xBYxt%2FWGf%2FoSPRSzd8XuhKvA%3D%3D";

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
export const disableData = async (contentId) => {
  // 컨텐츠ID가 “129619”인 무장애여행 정보 조회
  const response = await axios.get(
    `http://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?serviceKey=${serviceKey}&contentId=${contentId}&MobileOS=ETC&MobileApp=Befree&_type=json`
  );

  const data = response.data.response.body.items.item[0];
  if (data !== null) {
    const list = new Map(Object.entries(data));
    let ordredList = {};
    for (const [name, value] of list) {
      let eName = `${name}`;
      let val = `${value}`;
      if (val !== "" && eName !== "contentid") {
        if (val.includes("_")) {
          val = val.split("_")[0];
        }
        if (eName === "wheelchair") {
          val = "휠체어 대여 가능";
        } else if (eName === "helpdog") {
          val = "안내견 동반 가능";
        } else if (eName === "stroller") {
          val = "유모차 대여 가능";
        } else if (eName === "exit") {
          val = `출입통로 : ${value}`;
        } else if (eName === "publictransport") {
          val = `접근로 : ${value}`;
        } else if (eName === "babysparechair") {
          val = `유아 의자 ${value}`;
        }
        ordredList[eName] = val;
      }
    }
    return ordredList;
  }
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
  cat2,
  numOfRows
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
      `http://apis.data.go.kr/B551011/KorWithService1/${keyUrl}?serviceKey=${serviceKey}` +
      `&numOfRows=${numOfRows}` +
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
    const response = await axios.get(requestLink);
    return response.data;
  }
};

// 위 API를 필터링 해서 가져오기
// API 전송 함수
export const sendPlaceKeywordDataApi = async (recentResult) => {
  let placeDataList = [];
  let facilitiesList = [];
  let lastPageInfo = 1;
  const facilityTF = recentResult.facilityCodeArray.length === 0;

  // 장애 & 취약 관련 정보 없을 때 12개 한번에 요청
  if (facilityTF) {
    lastPageInfo = recentResult.pageInfo[recentResult.pageIndex] + 1;
    const data = await placeKeywordData(
      recentResult.pageInfo[recentResult.pageIndex], // pageNo
      recentResult.imgNece || "A", //arrange
      recentResult.keywordVal, //keyword
      recentResult.category, //contentTypeId
      recentResult.region, //areaCode
      recentResult.sigungu, //sigunguCode
      null, //cat1
      null, //cat2
      6 // 한번에 요청하는 개수
    );

    const item = data.response.body.items.item;

    // 장소 저장
    placeDataList = item;

    // 장소 시설 탐색
    for (let i = 0; i < item.length; i++) {
      let tempFacil = [];
      const conId = item[i].contentid;

      const disableReturnData = await disableData(conId); // 여기에 데이터 저장

      for (let key in disableReturnData) {
        if (disableReturnData[key].trim() && key !== "contentid") {
          let val = disableReturnData[key];
          if (val.includes("_")) {
            val = val.split("_")[0];
          }
          tempFacil.push(val);
        }
      }
      facilitiesList.push(tempFacil);
    }
  } else {
    // ==================================================================================================================================================== 1개씩 요청
    let pageNum = recentResult.pageInfo[recentResult.pageIndex];
    // while (pageNum < 6) {
    while (placeDataList.length < 6) {
      const data = await placeKeywordData(
        pageNum, // pageNo
        recentResult.imgNece || "A", //arrange
        recentResult.keywordVal, //keyword
        recentResult.category, //contentTypeId
        recentResult.region, //areaCode
        recentResult.sigungu, //sigunguCode
        null, //cat1
        null, //cat2
        1 // 한번에 요청하는 개수
      );
      pageNum++;
      if (data.response.body.items === "") {
        break;
      }

      // 장애에 따른 필터링
      const item = data.response.body.items.item[0];
      const conId = item.contentid;

      try {
        const disableReturnData = await disableData(conId); // 여기에 데이터 저장
        const facilities = recentResult.facilityCodeArray;

        // 필터링
        const hasAvailableFacility = facilities.some((facility) =>
          disableReturnData[facility.id]?.trim()
        );

        if (hasAvailableFacility) {
          // 시설을 저장
          let tempFacil = [];
          for (let key in disableReturnData) {
            if (disableReturnData[key].trim() && key !== "contentid") {
              let val = disableReturnData[key];
              if (val.includes("_")) {
                val = val.split("_")[0];
              }
              tempFacil.push(val);
            }
          }
          placeDataList.push(item);
          facilitiesList.push(tempFacil);
        }
      } catch (error) {
        console.error("Error fetching disable data:", error);
      }
    }
    lastPageInfo = pageNum;
  }

  // 지도 만들기
  const newMap = []; // 새로운 배열 생성
  if (placeDataList.length !== 0) {
    for (let i = 0; i < placeDataList.length; i++) {
      const item = placeDataList[i];
      const mapObj = {
        mapx: item.mapx,
        mapy: item.mapy,
        title: item.title,
      };
      newMap.push(mapObj);
    }
  }

  let newTripList = [];

  for (let i = 0; i < placeDataList.length; i++) {
    const item = placeDataList[i];
    const tempPlace = {
      src:
        item.firstimage ||
        item.firstimage2 ||
        process.env.PUBLIC_URL + "/assets/imgs/defaultImageStroke.png",
      alt: `${item.contentid}`,
      title: item.title,
      address: item.addr1,
      style: noDrag,
      contentId: item.contentid,
      contentTypeId: item.contenttypeid,
      facility: facilitiesList[i][0] ? facilitiesList[i] : null,
      mapx: newMap[i].mapx,
      mapy: newMap[i].mapy,
    };
    newTripList.push(tempPlace);
  }
  const returnValue = {
    newTripList: newTripList,
    numOfRows: placeDataList.length,
    newMap: newMap,
    lastPageInfo: lastPageInfo,
    isBOF: recentResult.isBOF,
  };

  return returnValue;
};

////////////////////////////////////////////////////PlaceDetail

export const getPlaceDetail = async (contentId) => {
  let link =
    `https://apis.data.go.kr/B551011/KorWithService1/detailCommon1?firstImageYN=Y&serviceKey=` +
    `${serviceKey}` +
    `&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=` +
    `${contentId}` +
    `&defaultYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;
  const response = await axios.get(link);
  return response.data.response.body.items.item[0];
};

export const getPlaceDetailImg = async (contentId) => {
  let link =
    `https://apis.data.go.kr/B551011/KorWithService1/detailImage1?serviceKey=` +
    `${serviceKey}` +
    `&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=` +
    `${contentId}` +
    `&imageYN=Y&subImageYN=Y&_type=json`;
  const response = await axios.get(link);

  return response.data.response.body;
};

export const getPlaceDetailIntro = async (contentId, contentTypeId) => {
  let link =
    `https://apis.data.go.kr/B551011/KorWithService1/detailIntro1?serviceKey=` +
    `${serviceKey}` +
    `&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=` +
    `${contentId}` +
    `&contentTypeId=` +
    `${contentTypeId}`;
  const response = await axios.get(link);

  return response.data.response.body.items.item[0];
};
