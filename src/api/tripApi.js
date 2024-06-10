import axios from "axios";

// const serviceKey =
//   "uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D";
const serviceKey =
  "K2%2FtyPnwaOZfrMCvSUG10bEQaU8GaFxghNI2voZCpUhGx2UALE2Hn3aXUw4cc0xBYxt%2FWGf%2FoSPRSzd8XuhKvA%3D%3D";

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
		return (await axios.get(requestLink)).data;
	}
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

// 위 API를 필터링 해서 가져오기
// API 전송 함수
export const sendPlaceKeywordDataApi = async (recentResult) => {
	console.log(recentResult.facilityCodeArray);
	let placeDataList = [];
	let facilitiesList = [];
	const facilityTF = recentResult.facilityCodeArray.length == 0;

  // 장애 & 취약 관련 정보 없을 때 12개 한번에 요청
  if (facilityTF) {
    const data = await placeKeywordData(
      placeDataList.length + 1, // pageNo
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
      console.log("장소 시설 탐색중...");
      let tempFacil = [];
      const conId = item[i].contentid;

      console.log(conId);

      const disableReturnTotalData = await disableData(conId); // 여기에 데이터 저장
      const disableReturnData =
        disableReturnTotalData.response.body.items.item[0];

      for (let key in disableReturnData) {
        if (disableReturnData[key].trim() && key != "contentid") {
          let value = disableReturnData[key].replace("_무장애 편의시설", "");
          value = value.replace("_시각장애인 편의시설", "");
          value = value.replace("_청각장애인 편의시설", "");
          value = value.replace("_지체장애인 편의시설", "");
          tempFacil.push(value);
        }
      }
      facilitiesList.push(tempFacil);
    }
  } else {
    let pageNum = 1;
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
      if (data.response.body.items == "") {
        break;
      }

			// 장애에 따른 필터링
			if (!facilityTF) {
				const item = data.response.body.items.item[0];
				const conId = item.contentid;

        try {
          const disableReturnTotalData = await disableData(conId); // 여기에 데이터 저장
          const disableReturnData =
            disableReturnTotalData.response.body.items.item[0];
          const facilities = recentResult.facilityCodeArray;

					// 필터링
					const hasAvailableFacility = facilities.some((facility) =>
						disableReturnData[facility.id]?.trim()
					);

          if (hasAvailableFacility) {
            // 시설을 저장
            let tempFacil = [];
            for (let key in disableReturnData) {
              if (disableReturnData[key].trim() && key != "contentid") {
                let value = disableReturnData[key].replace(
                  "_무장애 편의시설",
                  ""
                );
                tempFacil.push(value);
              }
            }
            console.log("====True====");
            placeDataList.push(item);
            facilitiesList.push(tempFacil);
          }
        } catch (error) {
          console.error("Error fetching disable data:", error);
        }
      } else {
        const item = data.response.body.items.item;

        // 장소 저장
        placeDataList.push(item);

        // 장소 시설 탐색
        for (let i = 0; i < item.size; i++) {
          console.log("장소 시설 탐색중...");
          let tempFacil = [];
          const conId = item[i].contentid;
          const disableReturnTotalData = await disableData(conId); // 여기에 데이터 저장
          const disableReturnData =
            disableReturnTotalData.response.body.items.item[0];
          for (let key in disableReturnData) {
            if (disableReturnData[key].trim() && key != "contentId") {
              let value = disableReturnData[key].replace(
                "_무장애 편의시설",
                ""
              );
              tempFacil.push(value);
            }
          }
          facilitiesList.push(tempFacil);
        }
      }
    }
  }

  // 지도 만들기
  const newMap = []; // 새로운 배열 생성
  if (placeDataList.length != 0) {
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
  };

	console.log(returnValue);

	return returnValue;
};

////////////////////////////////////////////////////PlaceDetail

export const getPlaceDetail = async (contentId) => {
	let link =
		`https://apis.data.go.kr/B551011/KorWithService1/detailCommon1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=` +
		`${contentId}` +
		`&defaultYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;
	console.log("tripApi getPlaceDetail 실행 contentId:", contentId);
	const response = await axios.get(link);
	// return response.data.response.body.items.item[0];
  return response.data;
};

export const getPlaceDetailImg = async (contentId) => {
  console.log("getPlaceDetailImg 실행");
	let link =
  `https://apis.data.go.kr/B551011/KorWithService1/detailImage1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=` +
  `${contentId}` +
  `&imageYN=Y&subImageYN=Y&_type=json`;
	const response = await axios.get(link);
	// return response.data.response.body.items.item;
  return response.data;
};

export const getPlaceDetailIntro = async (contentId, contentTypeId) => {
  console.log("getPlaceDetailIntro 실행", contentId, contentTypeId);
	let link =
  `https://apis.data.go.kr/B551011/KorWithService1/detailIntro1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=` +
  `${contentId}` +
  `&contentTypeId=` +
  `${contentTypeId}`;
	const response = await axios.get(link);
	return response.data.response.body.items.item[0];
};

export const getPlaceDetailWithTour = async (contentId) => {
  console.log("getPlaceDetailWithTour 실행");
	let link =
  `http://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?serviceKey=uO3hkVTS0Jua91aVTLwTYLDL9n1Tta108iwJEvwieZmxcwtzO32Fk9cyhgaKc5A22IM%2FREUAIyCVKvoTbvnfmg%3D%3D&MobileOS=ETC&MobileApp=AppTest&contentId=` +
  `${contentId}`;
  const response = await axios.get(link);
  return response.data;
};
