import React, { useEffect, useState } from "react";
import PagenationComponent from "../../components/tripList/PagenationComponent";
import useCustomMove from "../../hooks/useCustomMove";
import { getSharedTripList } from "../../api/befreeApi";
import BasicLayout from "../../layouts/BasicLayout";

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

const TripSharedList = () => {
  const { moveToTripListDetail } = useCustomMove();

  const [tripList, setTripList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchTripList = (page) => {
    //console.log("fetchTripList 호출됨");
    getSharedTripList(page).then((data) => {
      //console.log("안쪽");
      let dataResult = data.RESULT.paginatedTrips;
      setTotalPage(data.RESULT.totalPage);
      //console.log(dataResult);

      const tripListTemp = dataResult.map((trip) => {
        const tbegin = new Date(trip.tbegin);
        const tend = new Date(trip.tend);
        const formattedBeginDate = `${tbegin.getFullYear()}.${
          tbegin.getMonth() + 1
        }.${tbegin.getDate()}`;
        const formattedEndDate = `${tend.getFullYear()}.${
          tend.getMonth() + 1
        }.${tend.getDate()}`;

        return {
          src:
            process.env.PUBLIC_URL +
            "/assets/imgs/trip_list_size_down_" +
            trip.tid +
            ".png",
          alt: trip.tid,
          date: formattedBeginDate + " ~ " + formattedEndDate,
          title: trip.ttitle,
          region: trip.tregion,
          style: noDrag,
          shared: "true",
        };
      });

      setTripList(tripListTemp);
    });
  };

  const numButtonClicked = (buttonNumber) => {
    setPage(buttonNumber);
  };

  useEffect(() => {
    fetchTripList(page);
  }, [page]);

  return (
    <>
      <BasicLayout>
        <div className="grid place-items-center">
          <div className="font-['Pretendard-Semibold'] sm:text-4xl text-xl mt-6 lg:mt-12">
            공유된 여행 코스
          </div>
          <span className="font-['Pretendard-Medium'] sm:text-xl text-sm text-gray-600 mt-4 mb-8">
            다른 사람들과 여행 일정을 공유해보세요
          </span>
          <div className="max-w-sm lg:max-w-6xl my-[1%] w-[100%] border-[1px] border-neutral-500"></div>
        </div>
        <div className="grid place-items-center lg:mt-10 mt-3">
          {tripList.length === 0 || tripList == [] ? (
            <>
              <div className="flex justify-center my-4 mt-40 mb-40 font-[Pretendard-Regular]">
                아직 아무도 여행 목록을 공유하지 않았습니다
              </div>
            </>
          ) : (
            <div>
              {tripList.map((item) => (
                <div className="max-w-sm lg:max-w-6xl" key={item.src}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={item.style}
                    className="rounded-md h-14 sm:h-full hover:cursor-pointer"
                    onClick={() =>
                      moveToTripListDetail(
                        item.alt,
                        item.title,
                        item.date,
                        item.region,
                        item.shared
                      )
                    }
                  ></img>
                  <div className="flex justify-between">
                    <div
                      className="sm:mt-2 mb-4 hover:cursor-pointer"
                      onClick={() =>
                        moveToTripListDetail(
                          item.alt,
                          item.title,
                          item.date,
                          item.region
                        )
                      }
                    >
                      <span className="font-[Pretendard-Light] text-sm sm:text-lg">
                        {item.date}
                      </span>
                      <div className="font-[Pretendard-Light] text-sm sm:text-lg text-gray-600">
                        {item.title}
                      </div>
                    </div>
                    <div className="flex items-center sm:mt-2 mb-4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <PagenationComponent
          page={page}
          totalPage={totalPage}
          numButtonClicked={numButtonClicked}
          withDays={false}
        />
      </BasicLayout>
    </>
  );
};

export default TripSharedList;
