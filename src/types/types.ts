export interface iActions {
  type: string;
  data?: iState;
}
export interface iState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}
export interface store {
  registration: iState;
  loggedin: boolean;
}
export interface error {
  error: boolean;
  helpText: string;
}
