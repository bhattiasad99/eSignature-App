import PropTypes from "prop-types";
import { Button } from "@mui/material";
import styles from "./style";

const ButtonComponent = ({
  variant = "contained",
  extraRounded = false,
  styleOverrides,
  children,
  fullWidth = false,
  ...otherProps
}) => {
  return (
    <Button
      variant={variant}
      sx={{
        ...styleOverrides,
        width: fullWidth ? "100%" : "auto",
        ...styles({ extraRounded }),
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

ButtonComponent.propTypes = {
  children: PropTypes.any,
  extraRounded: PropTypes.bool,
  fullWidth: PropTypes.bool,
  styleOverrides: PropTypes.any,
  variant: PropTypes.string,
};

export default ButtonComponent;
