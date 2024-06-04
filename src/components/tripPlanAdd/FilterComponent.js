import React, { useState } from "react";
import "../../css/TripPlanAdd.css";
import { placeKeywordData } from "../../api/tripApi";

// 정렬구분 (A=제목순,C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
// 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID

var regionValue = {
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

console.log(regionValue);
// var seoulGuVal = {
//   1 강남구
//   2 강동구
//   3 강북구
//   4
//   강서구
//   5
//   관악구
//   6
//   광진구
//   7
//   구로구
//   8
//   금천구
//   9
//   노원구
//   10
//   도봉구
//   11
//   동대문구
//   12
//   동작구
//   13
//   마포구
//   14
//   서대문구
//   15
//   서초구
//   16
//   성동구
//   17
//   성북구
//   18
//   송파구
//   19
//   양천구
//   20
//   영등포구
//   21
//   용산구
//   22
//   은평구
//   23
//   종로구
//   24
//   중구
//   25
//   중랑구}

const regions = {
    서울특별시: ["전체", "강남구", "강동구", "강북구"],
    부산광역시: ["전체", "금정구", "기장군"],
    경기도: ["전체", "가평군", "고양시", "과천시"],
};

const categories = {
    음식: ["한식", "서양식", "일식", "중식", "이색음식점", "카페/전통찻집"],
    쇼핑: ["쇼핑1", "쇼핑2", "쇼핑3"],
    숙박: ["숙박1", "숙박2", "숙박3"],
    레포츠: ["레포츠1", "레포츠2", "레포츠3"],
    추천코스: ["추천코스1", "추천코스2", "추천코스3"],
    인문: ["인문1", "인문2", "인문3"],
    자연: ["자연1", "자연2", "자연3"],
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
    items.map((item) => (
        <button
            key={item}
            className={selectedItem === item ? "selected" : ""}
            onClick={() => toggleFunction(item)}
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

const TripPlanAddComponent = () => {
    const [selectedProvinces, setSelectedProvinces] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState(
        []
    );
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [currentProvince, setCurrentProvince] = useState("");

    const toggleSelection = (setter, array, value) => {
        setter(
            array.includes(value)
                ? array.filter((item) => item !== value)
                : [...array, value]
        );
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

    const handleSubCategoryClick = (subCategory) => {
        setSelectedSubCategory(subCategory);
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
        } else if (selectedSubCategory === item) {
            setSelectedSubCategory("");
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
        setSelectedSubCategory("");
        setSelectedAccessibilityTypes([]);
        setSelectedFacilities([]);
    };

    return (
        <div className="container font-['Pretendard'] text-center">
            <div className="page-header">
                <h1>검색</h1>
                <p>조건에 맞는 여행지를 탐색해보세요</p>
            </div>

            <div className="search-bar">
                <input type="text" placeholder="검색어" />
                <button>검색</button>
            </div>

            <div className="filters flex flex-col items-center">
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
                        items={Object.keys(categories)}
                        selectedItem={selectedCategory}
                        toggleFunction={handleCategoryClick}
                    />
                    {selectedCategory && (
                        <div className="sub-options flex flex-wrap justify-center">
                            {categories[selectedCategory].map((subCategory) => (
                                <button
                                    key={subCategory}
                                    className={`m-1 ${
                                        selectedSubCategory === subCategory
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => handleSubCategoryClick(subCategory)}
                                >
                                    {subCategory}
                                </button>
                            ))}
                        </div>
                    )}
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
                    <SelectionButtons
                        items={facilities}
                        selectedItems={selectedFacilities}
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
                        selectedSubCategory,
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
                    <button>검색하기</button>
                </div>
            </div>
        </div>
    );
};

export default TripPlanAddComponent;
