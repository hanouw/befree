import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8085";

export const loginPost = async (loginParam) => {
	const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
	const form = new FormData();
	form.append("username", loginParam.email);
	form.append("password", loginParam.password);

	const response = await axios.post(
		`${API_SERVER_HOST}/member/login`,
		form,
		header
	);

	return response.data;
};

export const register = async (input) => {
  console.log("register 실행")
	const header = { Headers: { "Content-Type": "application/json" } };

	const response = await axios.post(
		`${API_SERVER_HOST}/member/register`,
		input,
		header
	);

	return response.data;
};
