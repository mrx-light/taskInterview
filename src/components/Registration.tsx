import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../actions/Actions";
import { error, iState } from "../types/types";

function Registration() {
  const name: string = "asndbs";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [userInfo, setUserInfo] = useState<iState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const ifEmail = (email: string): boolean => {
    const re: RegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const [errorInputUser, setErrorInputUser] = useState<{
    error: boolean;
    helpTextDiffrentPass: string;
    helpTextSmallPass: string;
  }>({ error: false, helpTextDiffrentPass: "", helpTextSmallPass: "" });
  const [emailError, setEmailError] = useState<error>({
    error: false,
    helpText: "",
  });
  const [textError, setTextError] = useState<error>({
    error: false,
    helpText: "",
  });

  const clientRegistration = () => {
    if (
      userInfo.password.length !== 0 &&
      userInfo.lastName.length !== 0 &&
      userInfo.firstName.length !== 0 &&
      userInfo.email.length !== 0 &&
      userInfo.repeatPassword.length !== 0
    ) {
      if (userInfo.password.length >= 8) {
        if (userInfo.password === userInfo.repeatPassword) {
          const email = ifEmail(userInfo.email);
          if (email) {
            dispatch(REGISTER(userInfo));
            setErrorInputUser({
              error: false,
              helpTextDiffrentPass: "",
              helpTextSmallPass: "",
            });
            setEmailError({ error: false, helpText: "" });
            setTextError({ error: false, helpText: "" });
            goTo("login");
            return;
          }
          setEmailError({ error: true, helpText: "Invalid Email" });
          return;
        }
        setErrorInputUser({
          error: true,
          helpTextDiffrentPass: "Wrong Password",
          helpTextSmallPass: "",
        });
        return;
      }
      setErrorInputUser({
        error: true,
        helpTextDiffrentPass: "",
        helpTextSmallPass: "Small Password",
      });
      return;
    }
    setEmailError({ error: true, helpText: "Empty Input" });
    setTextError({ error: true, helpText: "Empty Input" });
    setErrorInputUser({
      error: true,
      helpTextDiffrentPass: "Empty Input",
      helpTextSmallPass: "Empty Input ",
    });
    return;
  };

  const getUserInfo = (el: any, objName: string) => {
    setUserInfo((prevState: iState) => {
      return { ...prevState, [objName]: el.target.value };
    });
  };
  const goTo = (path: string) => {
    history(`/${path}`, { replace: true });
  };
  return (
    <div>
      <div className="flex">
        <h2 className="textCenter">Registration Page</h2>
        <div className="flex">
          <h3 className="pointer space" onClick={() => goTo("")}>
            Home
          </h3>
          <h3 className="pointer space" onClick={() => goTo("login")}>
            Login
          </h3>
        </div>
      </div>
      <div className="box">
        <div className="grid">
          <TextField
            error={textError.error}
            label="First Name"
            variant="outlined"
            inputProps={{ maxLength: 20 }}
            onChange={(
              el: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              getUserInfo(el, "firstName");
            }}
            helperText={textError.helpText}
          />
          <br />
          <TextField
            error={textError.error}
            label="Last Name"
            variant="outlined"
            inputProps={{ maxLength: 20 }}
            onChange={(
              el: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              getUserInfo(el, "lastName");
            }}
            helperText={textError.helpText}
          />
          <br />
          <TextField
            error={emailError.error}
            label="Email"
            variant="outlined"
            inputProps={{ maxLength: 40 }}
            onChange={(
              el: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              getUserInfo(el, "email");
            }}
            helperText={emailError.helpText}
          />
          <br />
          <TextField
            error={errorInputUser.error}
            label="Password"
            variant="outlined"
            type="password"
            inputProps={{ maxLength: 20 }}
            onChange={(
              el: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              getUserInfo(el, "password");
            }}
            helperText={errorInputUser.helpTextSmallPass}
          />
          <br />
          <TextField
            error={errorInputUser.error}
            label="Repeat Password"
            variant="outlined"
            type="password"
            inputProps={{ maxLength: 20 }}
            onChange={(
              el: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              getUserInfo(el, "repeatPassword");
            }}
            helperText={errorInputUser.helpTextDiffrentPass}
          />
          <br />
          <Button variant="contained" onClick={clientRegistration}>
            IOpta
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
