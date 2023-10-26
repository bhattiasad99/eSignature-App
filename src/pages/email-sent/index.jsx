import AuthLayout from "../../components/Layouts/AuthLayout";
import ButtonComponent from "../../components/base/ButtonComponent";
import TypographyComponent from "../../components/base/TypographyComponent";
import ImageComponent from "../../components/base/ImageComponent";
import StackComponent from "../../components/base/StackComponent";
import DividerComponent from "../../components/base/DividerComponent";
import { useNavigate } from "react-router-dom";
import { LINK_STYLE, LOGIN } from "../../config/constants";
import emailSentPhoto from "./../../assets/auth/email-sent.png";
import LinkComponent from "../../components/base/LinkComponent";

const EmailSent = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout heading="">
      <ImageComponent
        alt="email-sent"
        source={emailSentPhoto}
        width="219px"
        height="191px"
      />
      <TypographyComponent variant="h4">Email Sent!</TypographyComponent>
      <TypographyComponent sx={{ textAlign: "center" }}>
        Please Check your email inbox and click in the recieved link to reset
        your password
      </TypographyComponent>
      <ButtonComponent
        fullWidth
        onClick={() => {
          navigate(`/auth/${LOGIN}`);
        }}
      >
        Back to Login
      </ButtonComponent>
      <StackComponent sx={{ width: "100%" }} alignItems="center">
        <DividerComponent sx={{ flexGrow: 1 }} />
        <TypographyComponent>OR</TypographyComponent>
        <DividerComponent sx={{ flexGrow: 1 }} />
      </StackComponent>
      <TypographyComponent>
        Didn&apos;t Recieve the Link?{" "}
        <LinkComponent linkStyle={LINK_STYLE}>Resend</LinkComponent>
      </TypographyComponent>
    </AuthLayout>
  );
};

export default EmailSent;
