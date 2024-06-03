import "../../css/TripPlanAdd.css";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteTrip } from "../../api/befreeApi";

// header가 아닌 여행지 추가 페이지의 헤더
const TripTopBannerComponent = (data) => {
  const { moveToBack } = useCustomMove();

  const deleteClicked = () => {
    const deleteConfirm = window.confirm("정말로 삭제하시겠습니까?");
    if (deleteConfirm) {
      deleteTrip(data.tid).then(moveToBack);
    }
  };

  return (
    <>
      <div className="container-noline font-['Pretendard']">
        {data.topText == "여행지 살펴보기" ? (
          <header className="header">
            <h1>{data.topText}</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => deleteClicked()}
                className="text-center w-28 text-gray-900 inline-flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5 bg-white"
              >
                삭제하기
              </button>
              <button
                onClick={() => moveToBack()}
                className="text-center w-28 text-white inline-flex justify-center items-center bg-my-color-darkblue hover:bg-gray-500 border-black focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5"
              >
                돌아가기
              </button>
            </div>
          </header>
        ) : (
          <>
            <header className="header">
              <h1>{data.topText}</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => moveToBack()}
                  className="text-center w-28 text-gray-900 inline-flex justify-center border border-my-color-darkblue hover:bg-slate-100 focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5 bg-white"
                >
                  돌아가기
                </button>
                <button
                  onClick={() => moveToBack()}
                  className="text-center w-28 text-white inline-flex justify-center items-center bg-my-color-darkblue hover:bg-gray-500 border-black focus:ring-2 focus:outline-none focus:ring-slate-400 font-['Pretendard-Regular'] rounded-sm text-sm py-2.5"
                >
                  추가하기
                </button>
              </div>
            </header>
          </>
        )}

        <div className="banner">
          <img src={`/assets/imgs/trip_list_size_down_${data.tid}.png`} alt="Banner" />
          <div className="banner-text">
            <p>{data.date}</p>
            <p>{data.title}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripTopBannerComponent;
