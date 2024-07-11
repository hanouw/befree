import "../../css/TripPlanAdd.css";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteTrip } from "../../api/befreeApi";

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

// header가 아닌 여행지 추가 페이지의 헤더
const TripTopBannerComponent = (data) => {
  const { moveToTripList, moveToBack } = useCustomMove();

  const deleteClicked = () => {
    const deleteConfirm = window.confirm("정말로 삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteTrip(data.tid).then(moveToBack);
    }
  };

  const callBackFnClicked = () => {
    data.callBackFn();
  };

  return (
    <div className="flex place-content-center">
      <div className=" font-['Pretendard-Regular'] max-w-sm lg:max-w-6xl w-full">
        {data.topText == "여행 계획" ? (
          <header className="header">
            <h1 className="text-lg">{data.topText}</h1>
            {!data.isShared ? (
              <div className="flex space-x-4">
                <button
                  onClick={() => moveToBack()}
                  className="text-center w-10 lg:w-28 text-gray-900 inline-flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-xs lg:text-sm py-2 lg:py-2.5 bg-white"
                >
                  취소
                </button>
                <button
                  onClick={() => callBackFnClicked()}
                  className="text-center w-10 lg:w-28 text-white inline-flex justify-center items-center bg-my-color-darkblue hover:bg-gray-500 border-black focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-xs lg:text-sm py-2 lg:py-2.5"
                >
                  저장
                </button>
              </div>
            ) : (
              <></>
            )}
          </header>
        ) : (
          <></>
        )}
        {data.topText == "여행지 추가하기" ? (
          <>
            <header className="header">
              <h1>{data.topText}</h1>
              <div className="flex space-x-4">
              <button
                  onClick={() => moveToBack()}
                  className="text-center w-10 lg:w-28 text-gray-900 inline-flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-xs lg:text-sm py-2 lg:py-2.5 bg-white"
                >
                  취소
                </button>
                <button
                  onClick={() => callBackFnClicked()}
                  className="text-center w-10 lg:w-28 text-white inline-flex justify-center items-center bg-my-color-darkblue hover:bg-gray-500 border-black focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-xs lg:text-sm py-2 lg:py-2.5"
                >
                  저장
                </button>
              </div>
            </header>
          </>
        ) : (
          <></>
        )}
        {data.topText == "여행 계획 수정하기" ? (
          <>
            <header className="header">
              <h1>{data.topText}</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => moveToBack()}
                  className="text-center w-10 lg:w-28 text-gray-900 inline-flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-xs lg:text-sm py-2 lg:py-2.5 bg-white"
                >
                  취소
                </button>
                <button
                  onClick={() => callBackFnClicked()}
                  className="text-center w-10 lg:w-28 text-white inline-flex justify-center items-center bg-my-color-darkblue hover:bg-gray-500 border-black focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-xs lg:text-sm py-2 lg:py-2.5"
                >
                  저장
                </button>
              </div>
            </header>

          </>
        ) : (
          <></>
        )}

        <div className="banner max-w-sm lg:max-w-6xl w-full">
          <img
            src={`/assets/imgs/trip_list_size_down_${data.tid}.png`}
            alt="Banner"
            style={noDrag}
          />
          <div className="banner-text" style={noDrag}>
            <p className="text-sm lg:text-base">{data.date}</p>
            <p className="text-sm lg:text-base">{data.title}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TripTopBannerComponent;
