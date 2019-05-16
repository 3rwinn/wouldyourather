import { GET_USERS } from "./index";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}
