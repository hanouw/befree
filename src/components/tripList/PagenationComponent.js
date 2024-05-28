import React from "react";

const PagenationComponent = () => {
  return (
    <div>
      {/* pagenation */}
      {/* 데스크탑 */}
      <div className="grid place-items-center">
        <nav aria-label="Page navigation example" className="hidden sm:block">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700  "
              >
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
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight underline underline-offset-8 text-black bg-white hover:bg-gray-100 hover:text-gray-700  "
              >
                1
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700  "
              >
                2
              </p>
            </li>
            <li>
              <p
                href="#"
                aria-current="page"
                className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-gray-500  bg-white hover:bg-gray-100 hover:text-gray-700 "
              >
                3
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 "
              >
                4
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 "
              >
                5
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
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
              </p>
            </li>
          </ul>
        </nav>
      </div>

      {/* 모바일 */}
      <div className="grid place-items-center">
        <nav aria-label="Page navigation example" className="block sm:hidden">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
              >
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
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight underline underline-offset-8 text-black bg-white hover:bg-gray-100 hover:text-gray-700 "
              >
                1
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 "
              >
                2
              </p>
            </li>
            <li>
              <p
                href="#"
                aria-current="page"
                className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-gray-500  bg-white hover:bg-gray-100 hover:text-gray-700 "
              >
                3
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 "
              >
                4
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 "
              >
                5
              </p>
            </li>
            <li>
              <p
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
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
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PagenationComponent;
