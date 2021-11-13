import { iActions } from "../types/types";

export const loggedReducer = (state: boolean, action: iActions) => {
  if (action.type) {
    switch (action.type) {
      case "LOGIN":
        return (state = true);

      case "LOGOUT":
        return (state = false);
    }
  }
  return null;
};
