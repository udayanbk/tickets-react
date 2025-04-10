import axios from "axios";
import constants from "../config/constants";

const token = localStorage.getItem("token");
console.log('token', token)
const headers = {
  Authorization: `Bearer ${token}`,
};

export const createTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/new`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const bucketTickets = (payload) => {
  return axios
    .get(`${constants.APP_TICKET_API}/${payload.empId}`, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};


export const approveTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/approve`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const rejectTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/reject`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const actionTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/action`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};

export const ticketHistory = (payload) => {
  console.log('-----call', payload)
  return axios
    .post(`${constants.APP_TICKET_API}/history`, payload, {headers})
    .then((response) => response)
    .catch((error) => error.response);
};