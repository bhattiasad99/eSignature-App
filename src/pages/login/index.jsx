import { useDispatch } from "react-redux";
import AuthLayout from "./../../components/Layouts/AuthLayout";
import ButtonComponent from "./../../components/base/ButtonComponent";
import TextFieldComponent from "./../../components/base/TextFieldComponent";
import { authActions } from "./../../store/slices/auth";
import TypographyComponent from "../../components/base/TypographyComponent";
import LinkComponent from "../../components/base/LinkComponent";
import StackComponent from "../../components/base/StackComponent";
import DividerComponent from "../../components/base/DividerComponent";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <AuthLayout heading="Login">
      <TextFieldComponent label="Username" fullWidth />
      <TextFieldComponent label="Password" type="password" fullWidth />
      <ButtonComponent
        fullWidth
        onClick={() => {
          dispatch(authActions);
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
        <LinkComponent
          to="/auth/register"
          linkStyle={{
            fontWeight: 600,
            color: "blue",
          }}
        >
          Sign Up
        </LinkComponent>
      </TypographyComponent>
    </AuthLayout>
  );
};

export default Login;
