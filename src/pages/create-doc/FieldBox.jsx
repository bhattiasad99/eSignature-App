/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
// import { View } from "@react-pdf/renderer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButtonComponent from "../../components/base/IconButtonComponent";
import { View } from "@react-pdf/renderer";
import Moveable from "react-moveable";
import { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const buildStyleObject = (DOMNode) => {
  const computedStyle = window.getComputedStyle(DOMNode);
  const transform = computedStyle.transform;
  const matrix = transform
    .match(/^matrix\((.+)\)$/)[1]
    .split(", ")
    .map(parseFloat);

  return {
    matrix,
    style: DOMNode.style,
  };
};

const FieldBox = ({
  top,
  left,
  width,
  height,
  timeStamp,
  handleDelete = () => {
    return;
  },
  onUpdate = () => {
    return;
  },
  containerRef,
}) => {
  const targetRef = useRef(null);
  const [isSelected, setIsSelected] = useState(true);

  const selectBox = () => setIsSelected(true);
  const deselect = () => setIsSelected(false);
  useEffect(() => {
    const target = targetRef.current;
    if (target) {
      target.style.top = `${top}px`;
      target.style.left = `${left}px`;
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      target.style.transform = "translate(0px, 0px)";
    }
  }, [top, left, width, height]);

  const movableProps = {
    bounds: "parent",
    target: targetRef,
    container: null,
    origin: isSelected,
    edge: false,
    draggable: isSelected,
    rotatable: false,
    keepRatio: true,
    resizable: isSelected,
    scalable: isSelected,
    throttleScale: 0,
    throttleResize: 0,
    viewContainer: containerRef.current,
    throttleDrag: 0,
    onDragStart: ({ target, clientX, clientY }) => {},
    onDrag: ({
      target,
      beforeDelta,
      beforeDist,
      left,
      top,
      right,
      bottom,
      delta,
      dist,
      transform,
      clientX,
      clientY,
    }) => {
      target.style.transform = transform;
    },
    onDragEnd: ({ target, isDrag }) => {
      const { matrix, style } = buildStyleObject(target);
      const translateX = matrix[4];
      const translateY = matrix[5];
      const top = parseFloat(style.top);
      const left = parseFloat(style.left);
      const payload = {
        top: top + translateY,
        left: left + translateX,
        timeStamp,
        width: parseFloat(style.width),
        height: parseFloat(style.height),
      };

      onUpdate(payload);
    },

    onResizeStart: ({ target, clientX, clientY }) => {},
    onResize: ({
      target,
      width,
      height,
      dist,
      delta,
      direction,
      clientX,
      clientY,
    }) => {
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    },
    onResizeEnd: ({ target, isDrag, clientX, clientY }) => {
      // ~~~update this on drag end

      const { matrix, style } = buildStyleObject(target);
      const translateX = matrix[4];
      const translateY = matrix[5];
      const top = parseFloat(style.top);
      const left = parseFloat(style.left);
      const payload = {
        top: top + translateY,
        left: left + translateX,
        timeStamp,
        width: parseFloat(style.width),
        height: parseFloat(style.height),
      };

      onUpdate(payload);
    },

    onScaleStart: ({ target, clientX, clientY }) => {},
    onScale: ({ target, scale, dist, delta, transform, clientX, clientY }) => {
      target.style.transform = transform;
    },
    onScaleEnd: ({ target, isDrag, clientX, clientY }) => {},
    throttleRotate: 0,
    onRotateStart: ({ target, clientX, clientY }) => {},
    onRotate: ({ target, delta, dist, transform, clientX, clientY }) => {
      target.style.transform = transform;
    },
    onRotateEnd: ({ target, isDrag, clientX, clientY }) => {},
    pinchable: true,
    onPinchStart: ({ target, clientX, clientY, datas }) => {},
    onPinch: ({ target, clientX, clientY, datas }) => {},
    onPinchEnd: ({ isDrag, target, clientX, clientY, datas }) => {},
  };
  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          deselect();
        }}
      >
        <View
          onClick={() => {
            selectBox();
          }}
          ref={targetRef}
          style={{
            position: "absolute",
            cursor: isSelected ? "auto" : "pointer",
            background: "transparent",
            zIndex: 1000,
            border: "2px dashed rgba(0, 0, 0, 1)",
            borderRadius: "5px",
          }}
        >
          {isSelected ? (
            <IconButtonComponent
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => handleDelete(timeStamp)}
            >
              <DeleteForeverIcon color="error" />
            </IconButtonComponent>
          ) : null}
        </View>
      </ClickAwayListener>
      {isSelected ? <Moveable {...movableProps} /> : null}
    </>
  );
};

FieldBox.propTypes = {
  containerRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  handleDelete: PropTypes.func,
  height: PropTypes.any,
  left: PropTypes.any,
  onUpdate: PropTypes.func,
  timeStamp: PropTypes.any,
  top: PropTypes.any,
  width: PropTypes.any,
};

export default FieldBox;
