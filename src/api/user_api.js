import axios from "axios";
import constants from "../config/constants";

axios.defaults.withCredentials = true;

export const login = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/login`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const usersData = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/admin/get-users`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};


export const setUserRole = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/admin/set-role`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const getRoles = () => {
  return axios
    .get(`${constants.APP_USER_API}/admin/get-roles`)
    .then((response) => response)
    .catch((error) => error.response);
};

export const setNewHierarchy = (payload) => {
  return axios
    .post(`${constants.APP_USER_API}/admin/setHierarchy`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};