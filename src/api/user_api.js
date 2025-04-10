import axios from "axios";
import constants from "../config/constants";

const token = localStorage.getItem("token");
console.log('token', token)
const headers = {
  Authorization: `Bearer ${token}`,
};

export const usersData = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/admin/get-users`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const setUserRole = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/admin/set-role`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const getRoles = (payload) => {
  return axios
    .get(`${constants.APP_USER_API}/admin/get-roles`, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const setNewHierarchy = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/admin/setHierarchy`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};