import { useDispatch } from "react-redux";
import AuthLayout from "./../../components/Layouts/AuthLayout";
import ButtonComponent from "./../../components/base/ButtonComponent";
import TextFieldComponent from "./../../components/base/TextFieldComponent";
import { authActions } from "./../../store/slices/auth";
import TypographyComponent from "../../components/base/TypographyComponent";
import LinkComponent from "../../components/base/LinkComponent";
import StackComponent from "../../components/base/StackComponent";
import DividerComponent from "../../components/base/DividerComponent";

const Register = () => {
  const dispatch = useDispatch();

  return (
    <AuthLayout heading="Register">
      <TextFieldComponent label="First Name" fullWidth />
      <TextFieldComponent label="Last Name" fullWidth />
      <TextFieldComponent label="UserName" fullWidth />
      <TextFieldComponent label="Company Name" fullWidth />
      <TextFieldComponent type="email" label="Email" fullWidth />
      <TextFieldComponent type="password" label="Password" fullWidth />
      <TextFieldComponent type="password" label="Confirm Password" fullWidth />
      <ButtonComponent
        fullWidth
        onClick={() => {
          dispatch(authActions.login());
        }}
      >
        Register
      </ButtonComponent>
      <StackComponent sx={{ width: "100%" }} alignItems="center">
        <DividerComponent sx={{ flexGrow: 1 }} />
        <TypographyComponent>OR</TypographyComponent>
        <DividerComponent sx={{ flexGrow: 1 }} />
      </StackComponent>
      <TypographyComponent>
        Already have an account?{" "}
        <LinkComponent
          to="/auth/login"
          linkStyle={{
            fontWeight: 600,
            color: "blue",
          }}
        >
          Sign In
        </LinkComponent>
      </TypographyComponent>
    </AuthLayout>
  );
};

export default Register;
