import { useDispatch } from "react-redux";
import AuthLayout from "./../../components/Layouts/AuthLayout";
import ButtonComponent from "./../../components/base/ButtonComponent";
import TextFieldComponent from "./../../components/base/TextFieldComponent";
import { authActions } from "./../../store/slices/auth";
import TypographyComponent from "../../components/base/TypographyComponent";
import LinkComponent from "../../components/base/LinkComponent";
import StackComponent from "../../components/base/StackComponent";
import DividerComponent from "../../components/base/DividerComponent";
import { FORGOT_PASSWORD, REGISTER } from "../../config/constants";
import { useState } from "react";
import { login } from "../../services";

const LINK_STYLE = { fontWeight: 600, color: "blue", fontFamily: "roboto" };

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const updateFormData = ({ username, password }) => {
    let payload = {};
    if (username || username === "") {
      payload.username = username;
    }
    if (password || password === "") {
      payload.password = password;
    }
    setFormData((prevState) => ({
      ...prevState,
      ...payload,
    }));
  };
  const loginErr = errors.find((eachErr) => eachErr.target === "username");
  const passwordErr = errors.find((eachErr) => eachErr.target === "password");
  return (
    <AuthLayout heading="Login">
      <TextFieldComponent
        label="Username"
        fullWidth
        error={loginErr}
        helperText={loginErr?.message}
        value={formData.username}
        onChange={(e) => {
          let tempErrs = [...errors];
          const errorIndex = tempErrs.findIndex(
            (eachErr) => eachErr.target === "username"
          );
          if (errorIndex !== -1) {
            tempErrs.splice(errorIndex, 1);
          }
          setErrors(tempErrs);
          updateFormData({ username: e });
        }}
      />
      <TextFieldComponent
        error={passwordErr}
        helperText={passwordErr?.message}
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => {
          let tempErrs = [...errors];
          const errorIndex = tempErrs.findIndex(
            (eachErr) => eachErr.target === "password"
          );
          if (errorIndex !== -1) {
            tempErrs.splice(errorIndex, 1);
          }
          setErrors(tempErrs);
          updateFormData({ password: e });
        }}
        fullWidth
      />
      <StackComponent sx={{ width: "100%" }} justifyContent="flex-end">
        <LinkComponent to={`/auth/${FORGOT_PASSWORD}`} linkStyle={LINK_STYLE}>
          Forgot Password?
        </LinkComponent>
      </StackComponent>
      <ButtonComponent
        fullWidth
        onClick={() => {
          let tempErrors = [...errors];
          if (formData.username === "") {
            tempErrors.push({
              target: "username",
              message: "Username is Empty",
            });
          }

          if (formData.password === "") {
            tempErrors.push({
              target: "password",
              message: "Password is Empty",
            });
          }

          setErrors(tempErrors);
          if (tempErrors.length === 0) {
            login()
              .then((res) => {
                console.log({ res });
              })
              .catch((err) => {
                console.error(err.message);
              });
            // return dispatch(authActions.login());
          }
        }}
      >
        Login
      </ButtonComponent>
      <StackComponent sx={{ width: "100%" }} alignItems="center">
        <DividerComponent sx={{ flexGrow: 1 }} />
        <TypographyComponent>OR</TypographyComponent>
        <DividerComponent sx={{ flexGrow: 1 }} />
      </StackComponent>
      <TypographyComponent>
        Do Not Have An Account?{" "}
        <LinkComponent to={`/auth/${REGISTER}`} linkStyle={LINK_STYLE}>
          Sign Up
        </LinkComponent>
      </TypographyComponent>
    </AuthLayout>
  );
};

export default Login;
