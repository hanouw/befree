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

const tripList = [
	{
		src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_01.png",
		alt: "Main Image 01",
		title: "안목해변",
		address: "강릉시 창해로 1",
		style: noDrag,
	},
	{
		src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_02.png",
		alt: "Main Image 02",
		title: "광안리해수욕장",
		address: "부산광역시 광안리 78",
		style: noDrag,
	},
	{
		src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_03.png",
		alt: "Main Image 03",
		title: "김밥집",
		address: "서울시 진달래로 1",
		style: noDrag,
	},
	{
		src: process.env.PUBLIC_URL + "/assets/imgs/trip_list_size_down_04.png",
		alt: "Main Image 04",
		title: "곱창집",
		address: "경기도 하남시 57",
		style: noDrag,
	},
];

const FoundListComponent = () => {
  return (
    <>
      <div className="container-noline-list">
        <div className="page-header">
          <h1>목록</h1>
          <div className="w-[100%] my-[1%] border-[1px] border-neutral-500"></div>
        </div>
        <div className="grid grid-cols-3 gap-0 mt-10">
          {tripList.map((item) => (
            <div key={item.src} className="flex justify-evenly ">
              <div className="flex flex-col" style={{width: "90%"}}> 
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
