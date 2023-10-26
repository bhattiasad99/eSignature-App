import PropTypes from "prop-types";
import { Stack } from "@mui/material";

const StackComponent = ({
  children,
  spacing = "1rem",
  direction = "row",
  ...otherProps
}) => {
  return (
    <Stack spacing={spacing} direction={direction} {...otherProps}>
      {children}
    </Stack>
  );
};

StackComponent.propTypes = {
  children: PropTypes.any,
  direction: PropTypes.string,
  spacing: PropTypes.string,
};

export default StackComponent;
