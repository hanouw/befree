import axios from "axios";
import { BEFREE_API_SERVER_HOST } from "./befreeApi";
import jwtAxios from "../util/jwtUtil";

export const loginPost = async (loginParam) => {
	const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
	const form = new FormData();
	form.append("username", loginParam.email);
	form.append("password", loginParam.password);

	const response = await axios.post(
		`${BEFREE_API_SERVER_HOST}/member/login`,
		form,
		header
	);

	return response.data;
};

export const register = async (input) => {
	console.log("register 실행", input);
	const header = { Headers: { "Content-Type": "application/json" } };

	const response = await axios.post(
		`${BEFREE_API_SERVER_HOST}/member/register`,
		input,
		header
	);

	return response.data;
};

export const modify = async (data) => {
	console.log("modify 실행", data);
	const response = await jwtAxios.put(`${BEFREE_API_SERVER_HOST}/member/modify`, data);
	return response.data;
};

export const confirm = async (data) => {
	console.log("confirm 실행", data);
	const response = await jwtAxios.put(`${BEFREE_API_SERVER_HOST}/member/confirm`, data);
	console.log("confirm 결과", response.data)
	return response.data;
};

export const sendEmail = async (data) => {
	console.log("email 발송 데이터:" , data);
	const header = { Headers: { "Content-Type": "application/json" } };

	const response = await axios.post(
		`${BEFREE_API_SERVER_HOST}/member/email`,
		data,
		header
	);

	return response.data;
}
