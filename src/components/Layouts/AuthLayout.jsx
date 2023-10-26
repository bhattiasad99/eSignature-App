import PropTypes from "prop-types";
import CardComponent from "./../base/CardComponent";
import StackComponent from "../base/StackComponent";
import TypographyComponent from "../base/TypographyComponent";

const AuthLayout = ({ children, heading, subHeading }) => {
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
          sx={{
            width: "80%",
            margin: "0 auto",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {heading ? (
            <TypographyComponent sx={{ textAlign: "center" }} variant="h4">
              {heading}
            </TypographyComponent>
          ) : null}
          {subHeading ? (
            <TypographyComponent sx={{ textAlign: "center" }} variant="body">
              {subHeading}
            </TypographyComponent>
          ) : null}
          {children}
        </StackComponent>
      </CardComponent>
    </main>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.any,
  heading: PropTypes.any,
  subHeading: PropTypes.any,
};

export default AuthLayout;
