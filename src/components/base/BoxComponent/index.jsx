import PropTypes from "prop-types";
import { Box } from "@mui/material";

const BoxComponent = ({ children, ...otherProps }) => {
  return <Box {...otherProps}>{children}</Box>;
};

BoxComponent.propTypes = {
  children: PropTypes.any,
};

export default BoxComponent;
