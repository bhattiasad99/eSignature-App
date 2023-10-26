import PropTypes from "prop-types";
import CardComponent from "./../base/CardComponent";
import StackComponent from "../base/StackComponent";
import TypographyComponent from "../base/TypographyComponent";

const AuthLayout = ({ children, heading }) => {
  return (
    <main
      style={{
        background: "grey",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardComponent
        sx={{
          width: "40%",
          maxWidth: "500px",
          minWidth: "300px",
          height: "max-content",
          py: "1rem",
          borderRadius: "10px",
        }}
      >
        <StackComponent
          direction="column"
          alignItems="center"
          sx={{ width: "80%", margin: "0 auto" }}
        >
          <TypographyComponent variant="h4">{heading}</TypographyComponent>
          {children}
        </StackComponent>
      </CardComponent>
    </main>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.any,
  heading: PropTypes.any,
};

export default AuthLayout;
