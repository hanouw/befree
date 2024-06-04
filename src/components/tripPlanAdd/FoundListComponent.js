import { useEffect, useState } from "react";
import { disableData, keywordData, placeData, placeKeywordData } from "../../api/tripApi";
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

const FoundListComponent = (region) => {
  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    const dataResult = async () => {
      // pageNo, arrange, keyword, contentTypeId, areaCode, sigunguCode, cat1, cat2
      await placeKeywordData(1, "O", null, null, 39, 3, null, null).then((data) => {
        console.log("data", data);

        const refinedData = data.response.body || null;
        const newTripList = [];

        for (let i = 0; i < refinedData.numOfRows; i++) {
          const item = refinedData.items.item[i];
          const tempPlace = {
            src: item.firstimage || item.firstimage2 || process.env.PUBLIC_URL + "/assets/imgs/defaultImageStroke.png",
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
    };

    dataResult();
  }, []);
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
                  <span className="font-[Pretendard-Light] text-sm sm:text-lg">{item.title}</span>
                  <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">{item.address}</div>
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
