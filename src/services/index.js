import {
  COLLECTION_LOGS,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_SUCCESS,
} from "../config/constants";
import { failure, success } from "../helpers/responses";
import {
  getDocuments,
  postDocument,
  signin,
  signup,
} from "../config/firebase.utilities";

export const log = async (payload) => {
  console.log(payload);
  try {
    const res = await postDocument(COLLECTION_LOGS, payload);
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
};

export const register = async ({ email, password }) => {
  try {
    const userCredential = await signup(email, password);

    const user = userCredential.user;
    console.log({ user });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return failure(STATUS_INTERNAL_SERVER_ERROR, errorCode, errorMessage, {
      ...err,
    });
  }
};

export const login = async ({ email, password }) => {
  try {
    const userCredential = await signin(email, password);

    const user = userCredential.user;
    console.log({ user });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return failure(STATUS_INTERNAL_SERVER_ERROR, errorCode, errorMessage, {
      ...err,
    });
  }
};

export const getDocsTest = async () => {
  try {
    const res = await getDocuments("test");
    console.log({
      res,
    });
    return await success(STATUS_SUCCESS, undefined, undefined, res);
  } catch (err) {
    console.error(err.message);
  }
};
