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
  const totalPages = Math.ceil(totalPage / 10);

  const startPage = (currentPageGroup - 1) * 10 + 1;
  const endPage = Math.min(currentPageGroup * 10, totalPage);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const isClicked = (num) => {
    numButtonClicked(num);
  };

  const prevClicked = () => {
    const prevCurrentPageGroup = currentPageGroup;
    if (currentPageGroup > 1) {
      setCurrentPageGroup(prevCurrentPageGroup - 1);
      console.log(
        "prevClicked if문 통과되어 실행됨 / {...currentPageGroup} - 1 : ",
        prevCurrentPageGroup - 1
      );
      isClicked((prevCurrentPageGroup - 1) * 10 - 9);
    }
  };
  const nextClicked = () => {
    console.log("nextClicked", currentPageGroup, Math.ceil(totalPage / 10));
    const prevCurrentPageGroup = currentPageGroup;
    if (currentPageGroup < Math.ceil(totalPage / 10)) {
      setCurrentPageGroup(prevCurrentPageGroup + 1);
      console.log(
        "nextClicked if문 통과되어 실행됨 / {...currentPageGroup} + 1 : ",
        prevCurrentPageGroup + 1
      );
      isClicked((prevCurrentPageGroup + 1) * 10 - 9);
    }
  };

  return (
    <div>
      {/* Pagination */}
      {/* Desktop */}
      <div className="grid place-items-center">
        <nav aria-label="Page navigation example" className="hidden sm:block">
          <ul className="flex items-center -space-x-px h-10 text-base">
            {currentPageGroup > 1 ? (
              <li onClick={() => prevClicked()} className="cursor-pointer">
                <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
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
                </a>
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
                <a
                  className={`flex items-center px-4 h-10 leading-tight ${
                    num === page
                      ? // ? "underline underline-offset-8 font-[Pretendard-Medium] text-black"
                        "border-b-2 border-black font-[Pretendard-Medium] text-black"
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
                </a>
              </li>
            ))}
            {currentPageGroup < Math.ceil(totalPage / 10) ? (
              <li onClick={() => nextClicked()} className="cursor-pointer">
                <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
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
                </a>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile */}
      <div className="grid place-items-center">
        <nav aria-label="Page navigation example" className="block sm:hidden">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
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
              </a>
            </li>
            {pageNumbers.map((num) => (
              <li
                key={num}
                onClick={() => isClicked(num)}
                className="cursor-pointer"
              >
                <a
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    num === page
                      ? "underline underline-offset-8 text-black"
                      : "text-gray-500"
                  } bg-white hover:bg-gray-100 hover:text-gray-700`}
                >
                  {num}
                </a>
              </li>
            ))}
            <li>
              <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
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
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PagenationComponent;
