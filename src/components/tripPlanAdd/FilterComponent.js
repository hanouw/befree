import React, { useState } from "react";
import "../../css/TripPlanAdd.css";

const regionValue = {
  서울: "1",
  부산: "6",
  대구: "4",
  인천: "2",
  광주: "5",
  대전: "3",
  울산: "7",
  세종: "8",
  경기: "31",
  강원: "32",
  충북: "33",
  충남: "34",
  경북: "35",
  경남: "36",
  전북: "37",
  전남: "38",
  제주: "39",
};

const regions = {
  서울특별시: ["전체", "강남구", "강동구", "강북구"],
  부산광역시: ["전체", "금정구", "기장군"],
  경기도: ["전체", "가평군", "고양시", "과천시"],
};

const categories = {
  12: "관광지",
  14: "문화시설",
  15: "축제공연행사",
  28: "레포츠",
  32: "숙박",
  38: "쇼핑",
  39: "음식점",
};

const accessibilityTypes = [
  {
    type: "시각장애인",
    icon: "/assets/imgs/accessibilityTypes/hidden.svg",
    alt: "시각장애인",
  },
  {
    type: "청각장애인",
    icon: "/assets/imgs/accessibilityTypes/deafness.svg",
    alt: "청각장애인",
  },
  {
    type: "지체장애인",
    icon: "/assets/imgs/accessibilityTypes/disabled.svg",
    alt: "지체장애인",
  },
  {
    type: "노약자",
    icon: "/assets/imgs/accessibilityTypes/old-man.svg ",
    alt: "임산부",
  },
  {
    type: "유아",
    icon: "/assets/imgs/accessibilityTypes/baby-boy.svg",
    alt: "유아",
  },
];

const facilities = [
  "유아의자 있음",
  "가족화장실 있음",
  "기저귀 교환대 있음",
  "수유실 있음",
  "전용 입장권 할인",
  "유아놀이 보관 가능",
  "시각장애인 편의시설 있음",
  "청각장애인 편의시설 있음",
  "장애인 엘리베이터 있음",
  "장애인 화장실 있음",
  "장애인 주차장 있음",
  "휠체어/유모차 대여 가능",
  "휠체어 접근 가능 매표소 있음",
  "휠체어 사용자 테이블 접근이 용이함",
  "휠체어 접근 가능 전시관 있음",
];

const FilterSection = ({ title, children }) => (
  <div className="section">
    <h2>{title}</h2>
    <div className="options">{children}</div>
  </div>
);

const SelectionButtons = ({ items, selectedItem, toggleFunction }) =>
  Object.entries(items).map(([key, item]) => (
    <button
      key={key}
      className={selectedItem === key ? "selected" : ""}
      onClick={() => toggleFunction(key)}
    >
      {item}
    </button>
  ));

const AccessibilityButtons = ({ types, selectedItems, toggleFunction }) =>
  types.map(({ type, icon, alt }) => (
    <button
      key={type}
      className={`accessibility-button ${
        selectedItems.includes(type) ? "selected" : ""
      }`}
      onClick={() => toggleFunction(type)}
    >
      <img src={icon} alt={alt} />
    </button>
  ));
const FacilityButtons = ({ facilities, selectedFacilities, toggleFunction }) =>
  facilities.map((facility) => (
    <button
      key={facility}
      className={`facility-button ${
        selectedFacilities.includes(facility) ? "selected" : ""
      }`}
      onClick={() => toggleFunction(facility)}
    >
      {facility}
    </button>
  ));

const TripPlanAddComponent = ({ region, callBackFn }) => {
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState(
    []
  );
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [currentProvince, setCurrentProvince] = useState("");
  const [onlyWithImages, setOnlyWithImages] = useState(false);
  const [keyword, setKeyword] = useState("");

  const toggleSelection = (setter, array, value) => {
    setter(
      array.includes(value)
        ? array.filter((item) => item !== value)
        : [...array, value]
    );
  };

  // 검색( 키워드 옆 X ) 클릭 시 작동
  const searchClicked = () => {
    console.log(cityOptions); // 옵션 보여주기 (전체, 강남구, 강동구, 강북구)
    console.log(selectedProvinces); // 서울특별시
    console.log(selectedCities); // 서울특별시 강남구 O
    console.log(selectedCategory); // 28 O
    console.log(selectedAccessibilityTypes); // 지체장애인, 노약자
    console.log(selectedFacilities); // 전용 입장권 할인, 유아놀이 보관 가능
    console.log(onlyWithImages); // false O
    console.log(keyword); // 키워드 O
    callBackFn(selectedCities, selectedCategory, onlyWithImages, keyword);
  };

  const handleProvinceChange = (province) => {
    setSelectedProvinces((prevSelectedProvinces) =>
      prevSelectedProvinces.includes(province)
        ? prevSelectedProvinces
        : [...prevSelectedProvinces, province]
    );
    const options = regions[province].map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ));
    setCityOptions(options);
    setCurrentProvince(province);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    const formatted = `${currentProvince} ${city}`;

    setSelectedCities((prevSelectedCities) => {
      if (city === "전체") {
        return [
          ...prevSelectedCities.filter(
            (selected) => !selected.startsWith(currentProvince)
          ),
          formatted,
        ];
      } else {
        return [
          ...prevSelectedCities.filter(
            (selected) => selected !== `${currentProvince} 전체`
          ),
          formatted,
        ];
      }
    });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRemoveSelected = (item) => {
    if (selectedProvinces.includes(item)) {
      setSelectedProvinces((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    } else if (selectedCities.includes(item)) {
      setSelectedCities((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    } else if (selectedCategory && categories[selectedCategory] === item) {
      setSelectedCategory("");
    } else if (selectedAccessibilityTypes.includes(item)) {
      setSelectedAccessibilityTypes((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    } else if (selectedFacilities.includes(item)) {
      setSelectedFacilities((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const resetSelections = () => {
    setCityOptions([]);
    setSelectedProvinces([]);
    setSelectedCities([]);
    setSelectedCategory("");
    setSelectedAccessibilityTypes([]);
    setSelectedFacilities([]);
    setOnlyWithImages(false);
    setKeyword("");
  };

  const handleToggleImageFilter = () => {
    setOnlyWithImages(!onlyWithImages);
  };

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="container font-['Pretendard'] text-center">
      <div className="page-header">
        <h1>검색</h1>
        <p>조건에 맞는 여행지를 탐색해보세요</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="검색어 입력"
          onChange={keywordChange}
          value={keyword}
        />
      </div>

      <div className="filters flex flex-col items-center">
        <FilterSection
          title="이미지가 있는 여행지만 보기"
          className="w-full flex"
        >
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={handleToggleImageFilter}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-my-color-darkblue"></div>
          </label>
        </FilterSection>

        <FilterSection title="지역" className="w-full flex">
          <div className="flex items-center">
            <select
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="mr-2 mb-2"
            >
              <option value="">도/광역시 선택</option>
              {Object.keys(regions).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            <select onChange={handleCityChange} className="mb-2">
              <option value="">시/군/구 선택</option>
              {cityOptions}
            </select>
          </div>
        </FilterSection>

        <FilterSection
          title="관광 유형"
          className="w-full flex flex-col items-center"
        >
          <SelectionButtons
            items={categories}
            selectedItem={selectedCategory}
            toggleFunction={handleCategoryClick}
          />
        </FilterSection>

        <FilterSection
          title="관광 약자 유형"
          className="w-full flex flex-col items-center"
        >
          <AccessibilityButtons
            types={accessibilityTypes}
            selectedItems={selectedAccessibilityTypes}
            toggleFunction={(type) =>
              toggleSelection(
                setSelectedAccessibilityTypes,
                selectedAccessibilityTypes,
                type
              )
            }
          />
        </FilterSection>

        <FilterSection
          title="관광약자 편의시설"
          className="w-full flex flex-col items-center"
        >
          <FacilityButtons
            facilities={facilities}
            selectedFacilities={selectedFacilities}
            toggleFunction={(facility) =>
              toggleSelection(
                setSelectedFacilities,
                selectedFacilities,
                facility
              )
            }
          />
        </FilterSection>
      </div>

      <div className="page-footer">
        <div className="selected-area flex flex-wrap justify-center">
          {[
            ...selectedCities,
            categories[selectedCategory], // key를 value로 변경
            ...selectedAccessibilityTypes,
            ...selectedFacilities,
          ]
            .filter((item) => item)
            .map((item) => (
              <button
                key={item}
                onClick={() => handleRemoveSelected(item)}
                className="m-1"
              >
                {item}
              </button>
            ))}
        </div>

        <div className="buttons flex justify-center mt-4">
          <button onClick={resetSelections} className="mr-2">
            초기화
          </button>
          <button onClick={searchClicked}>검색하기</button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanAddComponent;
