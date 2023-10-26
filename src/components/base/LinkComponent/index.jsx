import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkComponent = ({
  linkStyle = {},
  children,
  to = "#",
  fullWidth,
  ...otherProps
}) => {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "black",
        width: fullWidth ? "100%" : "auto",
        ...linkStyle,
      }}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

LinkComponent.propTypes = {
  children: PropTypes.any,
  fullWidth: PropTypes.any,
  linkStyle: PropTypes.object,
  to: PropTypes.string,
};

export default LinkComponent;
