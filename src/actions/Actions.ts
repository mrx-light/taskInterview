import { iActions, iState } from "../types/types";

export const LOGIN = (): iActions => {
  return {
    type: "LOGIN",
  };
};

export const REGISTER = (obj: iState): iActions => {
  return {
    data: obj,
    type: "REGISTER",
  };
};

export const LOGOUT = (): iActions => {
  return {
    type: "LOGOUT",
  };
};
