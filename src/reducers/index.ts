import { combineReducers } from "redux";
import { loggedReducer } from "./loginReducer";
import { registrationUserReducer } from "./userReducer";

export const reducers = combineReducers({
  registration: registrationUserReducer,
  loggedin: loggedReducer,
});
