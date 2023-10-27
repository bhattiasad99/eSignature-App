import PropTypes from "prop-types";
import { useState } from "react";
import RectangleSelection from "react-rectangle-selection";

function RectangleSelectionComponent({
  handleSelection = () => {
    return;
  },
  disabled = false,
  children,
  ...otherProps
}) {
  const [selection, setSelection] = useState({
    origin: null,
    target: null,
  });

  const handleSelect = (e, coords) => {
    // console.log("select", coords);
    setSelection({
      origin: coords.origin,
      target: coords.target,
    });
  };

  return (
    <RectangleSelection
      {...otherProps}
      disabled={disabled}
      onSelect={handleSelect}
      style={{
        backgroundColor: "rgba(0, 0, 255, 0.4)",
        borderColor: "blue",
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          handleSelection(selection);
        }
      }}
    >
      {children}
    </RectangleSelection>
  );
}

RectangleSelectionComponent.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  handleSelection: PropTypes.func,
  handleSelectionSideEffects: PropTypes.func,
};

export default RectangleSelectionComponent;
