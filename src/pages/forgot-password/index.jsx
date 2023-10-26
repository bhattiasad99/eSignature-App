import AuthLayout from "../../components/Layouts/AuthLayout";
import ButtonComponent from "../../components/base/ButtonComponent";
import TextFieldComponent from "../../components/base/TextFieldComponent";
import TypographyComponent from "../../components/base/TypographyComponent";

import StackComponent from "../../components/base/StackComponent";
import DividerComponent from "../../components/base/DividerComponent";
import { useNavigate } from "react-router-dom";
import { EMAIL_SENT, LOGIN } from "../../config/constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout
      heading="Forgot Password"
      subHeading={"Please Enter the E-mail associated with your account"}
    >
      <TextFieldComponent label="Email" fullWidth type="email" />
      <ButtonComponent
        fullWidth
        onClick={() => {
          navigate(`/auth/${EMAIL_SENT}`);
        }}
      >
        Send Email
      </ButtonComponent>
      <StackComponent sx={{ width: "100%" }} alignItems="center">
        <DividerComponent sx={{ flexGrow: 1 }} />
        <TypographyComponent>OR</TypographyComponent>
        <DividerComponent sx={{ flexGrow: 1 }} />
      </StackComponent>
      <ButtonComponent
        variant="outlined"
        fullWidth
        onClick={() => {
          navigate(`/auth/${LOGIN}`);
        }}
      >
        Go back to Login
      </ButtonComponent>
    </AuthLayout>
  );
};

export default ForgotPassword;
