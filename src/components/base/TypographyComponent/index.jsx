import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const TypographyComponent = ({ children, ...otherProps }) => {
  return <Typography {...otherProps}>{children}</Typography>;
};

TypographyComponent.propTypes = {
  children: PropTypes.any,
  direction: PropTypes.string,
};

export default TypographyComponent;
