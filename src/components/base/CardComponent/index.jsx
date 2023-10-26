import PropTypes from "prop-types";
import { Card } from "@mui/material";

const CardComponent = ({ children, ...otherProps }) => {
  return <Card {...otherProps}>{children}</Card>;
};

CardComponent.propTypes = {
  children: PropTypes.any,
};

export default CardComponent;
