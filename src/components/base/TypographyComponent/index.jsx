import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const TypographyComponent = ({ children, sx, variant, ...otherProps }) => {
  return (
    <Typography
      variant={variant}
      sx={{
        ...(variant === "h1"
          ? {
              fontSize: "24px",
              fontWeight: 600,
            }
          : null),
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Typography>
  );
};

TypographyComponent.propTypes = {
  children: PropTypes.any,
  direction: PropTypes.string,
  sx: PropTypes.any,
  variant: PropTypes.string,
};

export default TypographyComponent;
