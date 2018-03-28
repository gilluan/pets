import { httpPost, httpGet } from "../utils";
import { push } from "react-router-redux";
import Constants from '../constants';

const loginRequestAction = () => {
  return {
    type: Constants.LOGIN_REQUEST
  }
}

const loginReceiveAction = payload => {
  return {
    type: Constants.LOGIN_SUCCESS,
    payload: payload
  }
}

export function loginUserRequest() {
  return dispatch => {
    dispatch(loginRequestAction());
  };
}

export function loginUserResponse(payload) {
  return dispatch => {
    localStorage.setItem("access_token", payload);
    dispatch(loginReceiveAction(payload));
    dispatch(push("/"));
  }
}
