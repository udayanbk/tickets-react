import axios from "axios";
import constants from "../config/constants";
axios.defaults.withCredentials = true;

export const createTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/new`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const bucketTickets = (payload) => {
  return axios
    .get(`${constants.APP_TICKET_API}/${payload.pageNo}`)
    .then((response) => response)
    .catch((error) => error.response);
};


export const approveTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/approve`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const rejectTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/reject`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const actionTicket = (payload) => {
  return axios
    .post(`${constants.APP_TICKET_API}/action`, payload)
    .then((response) => response)
    .catch((error) => error.response);
};

export const ticketHistory = (payload) => {
  console.log('-----call', payload)
  return axios
    .get(`${constants.APP_TICKET_API}/history/${payload.pageNo}`)
    .then((response) => response)
    .catch((error) => error.response);
};

export const getAllTickets = (payload) => {
  return axios
    .get(`${constants.APP_TICKET_API}/admin/getAllTickets`)
    .then((response) => response)
    .catch((error) => error.response);
};