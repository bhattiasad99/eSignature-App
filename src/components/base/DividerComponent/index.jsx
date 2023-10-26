import { Divider } from "@mui/material";
import PropTypes from "prop-types";

const DividerComponent = ({ ...otherProps }) => {
  return <Divider {...otherProps} />;
};

DividerComponent.propTypes = {
  children: PropTypes.any,
};

export default DividerComponent;
