import React, { useState } from "react";
import "../../css/TripPlanAdd.css";

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

const SelectionButtons = ({ items, selectedItems, toggleFunction }) =>
	items.map((item) => (
		<button
			key={item}
			className={selectedItems.includes(item) ? "selected" : ""}
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

const TripPlanAddComponent = () =>  {
	const [selectedProvinces, setSelectedProvinces] = useState([]);
	const [selectedCities, setSelectedCities] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedSubCategories, setSelectedSubCategories] = useState([]);
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
		setSelectedCategories([category]);
	};

	const handleSubCategoryClick = (subCategory) => {
		toggleSelection(
			setSelectedSubCategories,
			selectedSubCategories,
			subCategory
		);
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
		} else if (selectedSubCategories.includes(item)) {
			setSelectedSubCategories((prevSelected) =>
				prevSelected.filter((selectedItem) => selectedItem !== item)
			);
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
		setSelectedCategories([]);
		setSelectedSubCategories([]);
		setSelectedAccessibilityTypes([]);
		setSelectedFacilities([]);
	};

	return (
		<div className="container font-['Pretendard']">
			<div className="page-header">
				<h1>검색</h1>
				<p>조건에 맞는 여행지를 탐색해보세요</p>
			</div>

			<div className="search-bar">
				<input type="text" placeholder="검색어" />
				<button>검색</button>
			</div>

			<div className="filters">
				<FilterSection title="지역">
					<select onChange={(e) => handleProvinceChange(e.target.value)}>
						<option value="null">도/광역시 선택</option>
						{Object.keys(regions).map((province) => (
							<option key={province} value={province}>
								{province}
							</option>
						))}
					</select>
					<select onChange={handleCityChange}>
						<option value="">시/군/구 선택</option>
						{cityOptions}
					</select>
				</FilterSection>

				<FilterSection title="관광 유형">
					<SelectionButtons
						items={Object.keys(categories)}
						selectedItems={selectedCategories}
						toggleFunction={handleCategoryClick}
					/>
					{selectedCategories.length > 0 && (
						<div className="sub-options">
							{selectedCategories.flatMap((category) =>
								categories[category].map((subCategory) => (
									<button
										key={subCategory}
										className={
											selectedSubCategories.includes(subCategory)
												? "selected"
												: ""
										}
										onClick={() => handleSubCategoryClick(subCategory)}
									>
										{subCategory}
									</button>
								))
							)}
						</div>
					)}
				</FilterSection>

				<FilterSection title="관광 약자 유형">
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

				<FilterSection title="관광약자 편의시설">
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
				<div className="selected-area">
					{[
						...selectedCities,
						...selectedSubCategories,
						...selectedAccessibilityTypes,
						...selectedFacilities,
					].map((item) => (
						<button key={item} onClick={() => handleRemoveSelected(item)}>
							{item}
						</button>
					))}
				</div>

				<div className="buttons">
					<button onClick={resetSelections}>초기화</button>
					<button>검색하기</button>
				</div>
			</div>
		</div>
	);
}

export default TripPlanAddComponent;
