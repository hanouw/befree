import React, { useState } from "react";

const PagenationComponent = ({
  page,
  totalPage,
  numButtonClicked,
  withDays = true,
}) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(
    Math.ceil(page / 10)
  );

  const pageNumbers = [];
  const mobilePageNumbers = [];

  const startPage = (currentPageGroup - 1) * 10 + 1;
  const endPage = Math.min(currentPageGroup * 10, totalPage);

  const mobileStartPage = (currentPageGroup - 1) * 5 + 1;
  const mobileEndPage = Math.min(currentPageGroup * 5, totalPage);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  for (let i = mobileStartPage; i <= mobileEndPage; i++) {
    mobilePageNumbers.push(i);
  }

  const isClicked = (num) => {
    numButtonClicked(num);
  };

  const prevClicked = () => {
    const prevCurrentPageGroup = currentPageGroup;
    if (currentPageGroup > 1) {
      setCurrentPageGroup(prevCurrentPageGroup - 1);
      isClicked((prevCurrentPageGroup - 1) * 10 - 9);
    }
  };
  const nextClicked = () => {
    const prevCurrentPageGroup = currentPageGroup;
    if (currentPageGroup < Math.ceil(totalPage / 10)) {
      setCurrentPageGroup(prevCurrentPageGroup + 1);
      isClicked((prevCurrentPageGroup + 1) * 10 - 9);
    }
  };

  return (
    <div>
      {/* Pagination */}
      {/* 데스크탑 */}
      <div className="grid place-items-center">
        <nav aria-label="Page navigation example" className="hidden lg:block">
          <ul className="flex items-center -space-x-px h-10 text-base">
            {currentPageGroup > 1 ? (
              <li onClick={() => prevClicked()} className="cursor-pointer">
                <div className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </div>
              </li>
            ) : (
              <></>
            )}
            {pageNumbers.map((num) => (
              <li
                key={num}
                onClick={() => isClicked(num)}
                className="cursor-pointer"
              >
                <div
                  className={`flex items-center px-4 h-10 leading-tight ${
                    num === page
                      ? "border-b-2 border-black font-[Pretendard-Medium] text-black"
                      : "text-gray-500 font-[Pretendard-Medium]"
                  } bg-white hover:bg-gray-100 hover:text-gray-700`}
                >
                  {num}
                  {withDays ? (
                    <span className="font-[Pretendard-Regular] text-xs">
                      일차
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              </li>
            ))}
            {currentPageGroup < Math.ceil(totalPage / 10) ? (
              <li onClick={() => nextClicked()} className="cursor-pointer">
                <div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
      {/* 모바일 */}
      <div className="grid place-items-center">
        <nav aria-label="Page navigation example" className="block lg:hidden">
          <ul className="flex items-center -space-x-px h-10 text-base">
            {currentPageGroup > 1 ? (
              <li onClick={() => prevClicked()} className="cursor-pointer">
                <div className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </div>
              </li>
            ) : (
              <></>
            )}
            {mobilePageNumbers.map((num) => (
              <li
                key={num}
                onClick={() => isClicked(num)}
                className="cursor-pointer"
              >
                <div
                  className={`flex items-center px-3 h-10 leading-tight ${
                    num === page
                      ? "border-b-2 border-black font-[Pretendard-Medium] text-black"
                      : "text-gray-500 font-[Pretendard-Medium]"
                  } bg-white hover:bg-gray-100 hover:text-gray-700`}
                >
                  {num}
                  {withDays ? (
                    <span className="font-[Pretendard-Regular] text-xs">
                      일
                      <span className="font-[Pretendard-Regular] text-xs hidden lg:inline">
                        차
                      </span>
                    </span>
                  ) : (
                    <span></span>
                  )}
                </div>
              </li>
            ))}
            {currentPageGroup < Math.ceil(totalPage / 5) ? (
              <li onClick={() => nextClicked()} className="cursor-pointer">
                <div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PagenationComponent;
