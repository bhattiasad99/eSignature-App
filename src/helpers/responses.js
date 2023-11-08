import {
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_SUCCESS,
} from "../config/constants";
import { log } from "../services";

export const failure = async (status, code, message, payload, user) => {
  let resStatus = status ? status : STATUS_INTERNAL_SERVER_ERROR;
  const responseObj = {
    error: true,
    message: message ? message : "Error Occured!",
    code: code ? code : resStatus,
    status: resStatus,
    payload,
    time: Date.now(),
    user: user ? user : null,
  };
  await log(responseObj);
  return responseObj;
};

export const success = async (status, code, message, payload, user) => {
  let resStatus = status ? status : STATUS_SUCCESS;
  const responseObj = {
    error: false,
    code: code ? code : resStatus,
    status: resStatus,
    message: message ? message : "Successful!",
    payload,
    user: user ? user : null,
    time: Date.now(),
  };
  await log(responseObj);
  return responseObj;
};
