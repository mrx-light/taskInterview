import { iActions, iState } from "../types/types";

const stateOBJ: iState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};
export const registrationUserReducer = (
  state: iState = stateOBJ,
  action: iActions
): iState | null => {
  switch (action.type) {
    case "REGISTER": {
      if (action.data) {
        const user: iState = {
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          email: action.data.email,
          password: action.data.password,
          repeatPassword: action.data.repeatPassword,
        };
        return (state = user);
      }
    }
  }
  return state;
};
