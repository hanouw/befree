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
  const header = { Headers: { "Content-Type": "application/json" } };

  const response = await axios.post(
    `${BEFREE_API_SERVER_HOST}/member/register`,
    input,
    header
  );

  return response.data;
};

export const modify = async (data) => {
  const response = await jwtAxios.put(
    `${BEFREE_API_SERVER_HOST}/member/modify`,
    data
  );
  return response.data;
};

export const confirm = async (data) => {
  const response = await jwtAxios.put(
    `${BEFREE_API_SERVER_HOST}/member/confirm`,
    data
  );
  return response.data;
};

export const sendEmail = async (data) => {
  const header = { Headers: { "Content-Type": "application/json" } };
  const response = await axios.post(
    `${BEFREE_API_SERVER_HOST}/member/email`,
    data,
    header
  );
  return response.data;
};

export const sendNewPassword = async (data) => {
  const header = { Headers: { "Content-Type": "application/json" } };
  const response = await axios.post(
    `${BEFREE_API_SERVER_HOST}/member/password`,
    data,
    header
  );
  return response.data;
};
