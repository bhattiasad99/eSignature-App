import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const TypographyComponent = ({ value, onChange = () => {
  return
}, ...otherProps }) => {
  return (
    <TextField
      {...otherProps}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

TypographyComponent.propTypes = {
  children: PropTypes.any,
  direction: PropTypes.string,
  onChange: PropTypes.any,
  value: PropTypes.any,
};

export default TypographyComponent;
