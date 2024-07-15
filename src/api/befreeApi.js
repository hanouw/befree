import axios from "axios";

// export const BEFREE_API_SERVER_HOST = "http://3.36.84.228:8085";
export const BEFREE_API_SERVER_HOST = "http://localhost:8085";

const trip = `${BEFREE_API_SERVER_HOST}/trip`;

// 여행 생성
export const createTrip = async (email, tripRequestDTO) => {
  const response = await axios.post(`${trip}/${email}`, tripRequestDTO);
  return response.data;
};

// 여행 수정
export const updateTrip = async (email, tripRequestDTO, tid) => {
  const response = await axios.put(`${trip}/${email}/${tid}`, tripRequestDTO);
  return response.data;
};

// 여행 공유
export const shareTrip = async (email, tid) => {
  const response = await axios.put(`${trip}/${email}/${tid}/share`);
  return response.data;
};

// 여행 목록 조회
export const getTripList = async (email, page) => {
  const response = await axios.get(`${trip}/${email}/${page}`);
  return response.data;
};

// 공유된 여행 목록 조회
export const getSharedTripList = async (page) => {
  const response = await axios.get(`${trip}/sharedList/${page}`);
  return response.data;
};

// 여행 삭제
export const deleteTrip = async (tid) => {
  const response = await axios.delete(`${trip}/${tid}`);
  return response.data;
};

// 여행 상세 조회 (여행지 목록)
export const getTripDetail = async (tid, page) => {
  const response = await axios.get(`${trip}/detail/${tid}/${page}`);
  return response.data;
};

// 여행 상세 수정 (순서 이동, 날짜 이동, 여행지 삭제)
export const updateTripDetail = async (tid, planList) => {
  const response = await axios.put(`${trip}/${tid}`, planList);
  return response.data;
};

// 여행지 목록에 추가
export const addPlaceToTrip = async (tid, planList) => {
  const response = await axios.put(`${trip}/place/${tid}`, planList);
  return response.data;
};
