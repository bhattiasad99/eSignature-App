import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

const ButtonComponent = ({ children, ...otherProps }) => {
  return <IconButton {...otherProps}>{children}</IconButton>;
};

ButtonComponent.propTypes = {
  children: PropTypes.any,
};

export default ButtonComponent;
