import React, { useState } from "react";

const TripListDetailDateMoveModalComponent = ({
  totalPage,
  page,
  callBackFn,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const moveDateButtonCilckFn = (date) => {
    callBackFn(date);
  };

  const moveToDate = () => {
    let result = [];
    for (let i = 0; i < totalPage; i++) {
      if (i + 1 !== page) {
        result.push(
          <div
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-[Pretendard-Regular]"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={() => moveDateButtonCilckFn(i + 1)}
            key={i}
          >
            {i + 1} 일차
          </div>
        );
      }
    }
    return result;
  };

  return (
    <div>
      <div className="absolute lg:relative inline-block text-left mr-4 cursor-pointer mt-[9px]">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-[Pretendard-Regular] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded={showDropdown}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {page} 일차
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {showDropdown && (
          <div
            className="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-100 scale-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
            onAnimationEnd={() => {
              if (!showDropdown) {
                document.querySelector("#menu-button").focus();
              }
            }}
          >
            <div className="py-1" role="none">
              {moveToDate()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripListDetailDateMoveModalComponent;
