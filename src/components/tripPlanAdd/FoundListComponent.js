import { useEffect, useState } from "react";
import {
  disableData,
  keywordData,
  placeData,
  placeKeywordData,
} from "../../api/tripApi";
import PagenationComponent from "../tripList/PagenationComponent";

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

const FoundListComponent = (values) => {
  const [tripList, setTripList] = useState([]);
  const [recentResult, setRecentResult] = useState({
    category: null,
    imgNece: null,
    region: values.region,
    keywordVal: null,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalData, setTotalData] = useState(null);

  if (values != recentResult) {
    setRecentResult(values);
  }
  console.log(values);

  useEffect(() => {
    console.log("this++++++++++++++++++++", values.region);
    // pageNo, arrange, keyword, contentTypeId, areaCode, sigunguCode, cat1, cat2
    placeKeywordData(
      1, // pageNo
      values.imgNece || "O", //arrange
      values.keywordVal, //keyword
      values.category, //contentTypeId
      values.region, //areaCode
      null, //sigunguCode
      null, //cat1
      null //cat2
    ).then((data) => {
      console.log("data", data);
      setTotalData(data);
      setTotalCount(data.response.body.totalCount);

      const refinedData = data.response.body;
      const newTripList = [];

      for (let i = 0; i < refinedData.numOfRows; i++) {
        const item = refinedData.items.item[i];
        const tempPlace = {
          src:
            item.firstimage ||
            item.firstimage2 ||
            process.env.PUBLIC_URL + "/assets/imgs/defaultImageStroke.png",
          alt: `${item.cat3}-${item.contentid}`,
          title: item.title,
          address: item.addr1,
          style: noDrag,
        };
        newTripList.push(tempPlace);
      }

      setTripList(newTripList);
      console.log("set 실행 됨", newTripList);
    });
  }, [recentResult]);
  console.log("tripList", tripList);
  return (
    <>
      <div className="container-noline-list">
        <div className="page-header">
          <h1>목록</h1>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
        </div>
        <div className="grid grid-cols-3 gap-0 mt-10">
          {tripList.map((item) => (
            <div key={item.alt} className="flex justify-evenly ">
              <div className="flex flex-col" style={{ width: "90%" }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ ...item.style, height: "300px" }}
                  className="rounded-md h-24 sm:h-full"
                ></img>
                <div className="sm:mt-2 mb-4">
                  <span className="font-[Pretendard-Light] text-sm sm:text-lg">
                    {item.title}
                  </span>
                  <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">
                    {item.address}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PagenationComponent />
    </>
  );
};

export default FoundListComponent;
