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

const LINK_STYLE = { fontWeight: 600, color: "blue", fontFamily: "roboto" };

const Login = () => {
  const dispatch = useDispatch();

  return (
    <AuthLayout heading="Login">
      <TextFieldComponent label="Username" fullWidth />
      <TextFieldComponent label="Password" type="password" fullWidth />
      <StackComponent sx={{ width: "100%" }} justifyContent="flex-end">
        <LinkComponent to={`/auth/${FORGOT_PASSWORD}`} linkStyle={LINK_STYLE}>
          Forgot Password?
        </LinkComponent>
      </StackComponent>
      <ButtonComponent
        fullWidth
        onClick={() => {
          dispatch(authActions.login());
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
