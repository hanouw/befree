import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";
import useCustomMove from "../hooks/useCustomMove";

const navigation = [
  { name: "홈", href: "/" },
  { name: "공유된 코스", href: "/shared" },
  { name: "여행", href: "/trip/list" },
  { name: "마이페이지", href: "/mypage" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loginState = useSelector((state) => state.loginSlice);
  const { execLogout } = useCustomLogin();
  const { moveToMain } = useCustomMove();

  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      execLogout();
      alert("로그아웃 되었습니다.");
      moveToMain();
    }
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 py-2 lg:p-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/">
            <span className="sr-only">BeFree</span>
            <img
              className="h-3 lg:h-6 w-auto"
              src={process.env.PUBLIC_URL + "/assets/imgs/BeFree.svg"}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-32">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className=" text-base font-['Pretendard-SemiBold'] leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {!loginState.email ? (
            <Link
              to="/login"
              className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
            >
              로그인하기 <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
            >
              로그아웃 <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link to="/">
              <span className="sr-only">BeFree</span>
              <img
                className="h-4 w-auto"
                src={process.env.PUBLIC_URL + "/assets/imgs/BeFree.svg"}
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="ml-auto rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-['Pretendard-SemiBold'] leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {!loginState.email ? (
                  <Link
                    to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-['Pretendard-SemiBold'] leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    로그인하기
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-['Pretendard-SemiBold'] leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    로그아웃
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
