import PropTypes from "prop-types";
import { View } from "@react-pdf/renderer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButtonComponent from "../../components/base/IconButtonComponent";
const FieldBox = ({
  top,
  left,
  width,
  height,
  timeStamp,
  handleDelete = () => {
    return;
  },
}) => {
  return (
    <View
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        background: "transparent",
        zIndex: 1000,
        border: "2px dashed rgba(0, 0, 0, 1)",
        borderRadius: "5px",
      }}
    >
      <IconButtonComponent
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => handleDelete(timeStamp)}
      >
        <DeleteForeverIcon color="error" />
      </IconButtonComponent>
    </View>
  );
};

FieldBox.propTypes = {
  handleDelete: PropTypes.func,
  height: PropTypes.any,
  left: PropTypes.any,
  timeStamp: PropTypes.any,
  top: PropTypes.any,
  width: PropTypes.any,
};

export default FieldBox;
