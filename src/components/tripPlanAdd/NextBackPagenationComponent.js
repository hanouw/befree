import React from "react";

const PagenationComponent = ({ page, backnextButtonFn }) => {
  const backIsClicked = () => {
    console.log("back");
    backnextButtonFn(false);
  };
  const nextIsClicked = () => {
    console.log("next");
    backnextButtonFn(true);
  };

  return (
    <div>
      <div className="grid place-items-center mt-10">
        <nav area-label="Page navigation example" className="hidden sm:block">
          <ul className="flex items-center -space-x-px h-10 text-base gap-10">
            {page != 1 ? (
              <li
                onClick={backIsClicked}
                className="flex cursor-pointer items-center justify-center px-4 h-10 me-3 text-base font-[Pretendard-Medium] text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                이전 페이지
              </li>
            ) : (
              <></>
            )}
            <li
              onClick={nextIsClicked}
              className="flex cursor-pointer items-center justify-center px-4 h-10 text-base font-[Pretendard-Medium] text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              다음 페이지
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PagenationComponent;
