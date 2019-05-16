import { SET_AUTHED_USER, LOGOUT_USER } from "./index";

export function loginUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}