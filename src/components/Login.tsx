import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getStoreFun } from "..";
import { LOGIN } from "../actions/Actions";
import { error, iState, store } from "../types/types";

function Login() {
  const [emailPassword, setEmailPassword] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const user: iState = useSelector((state: store) => {
    return state.registration;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorEmail, setErrorEmail] = useState<error>({
    error: false,
    helpText: "",
  });
  const [errorPassword, setErrorPassword] = useState<error>({
    error: false,
    helpText: "",
  });

  const clickLogIn = async () => {
    if (
      emailPassword.email.trim() !== "" &&
      emailPassword.password.trim() !== ""
    ) {
      if (emailPassword.email === user.email) {
        if (emailPassword.password === user.password) {
          setErrorEmail({ error: false, helpText: "" });
          setErrorPassword({ error: false, helpText: "" });
          await dispatch(LOGIN());
          const bool = getStoreFun();
          if (bool) {
            navigate("/", { replace: true });
            return;
          }
          return;
        }
        setErrorPassword({ error: true, helpText: "Wrong Password" });
        return;
      }
      setErrorEmail({
        error: true,
        helpText: "There Is Not Such Email Like This",
      });
      const confirm = window.confirm("Do You Want To Registre");
      if (confirm) {
        navigate("/registration", { replace: true });
      }
      return;
    }
    setErrorEmail({ error: true, helpText: "Input Is Empty" });
    setErrorPassword({ error: true, helpText: "Input Is Empty" });
    return;
  };

  const getEmailPassword = (el: any, input: string) => {
    setEmailPassword((preState) => {
      return { ...preState, [input]: el.target.value.trim() };
    });
  };

  const goTo = (path: string) => {
    navigate(`/${path}`, { replace: true });
  };

  return (
    <div>
      <div className="flex">
        <h2 className="textCenter">Login Page</h2>
        <div className="flex">
          <h3 className="pointer space" onClick={() => goTo("")}>
            Home
          </h3>
          <h3 className="pointer space" onClick={() => goTo("registration")}>
            Registration
          </h3>
        </div>
      </div>
      <br />
      <div className="box">
        <div className="grid">
          <TextField
            error={errorEmail.error}
            label="Email"
            variant="outlined"
            onChange={(el) => getEmailPassword(el, "email")}
            helperText={errorEmail.helpText}
          />
          <br />
          <TextField
            error={errorPassword.error}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(el) => getEmailPassword(el, "password")}
            helperText={errorPassword.helpText}
          />
          <br />
          <Button variant="contained" onClick={clickLogIn}>
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
