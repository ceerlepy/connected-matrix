import React from "react";
import PropTypes from "prop-types";
import StyledButton from "../../styleComponents/button";
import StyledDiv from "../../styleComponents/div";

const gridButton = ({
  value,
  connectedItemSize,
  onClick,
  onHover,
  onHoverLeft,
  isHovered,
  isClicked,
  rowIndex,
  colIndex
}) => {
  let color = value === 1 ? "red" : "white";
  color = value === 1 && isHovered ? "yellow" : color;

  const onClickButton = () => {
    if (value === 1) {
      onClick(rowIndex, colIndex);
    }
  };

  const onHoverButton = () => {
    if (value === 1) {
      onHover(rowIndex, colIndex);
    }
  };

  const onHoverLeftButton = () => {
    if (value === 1) {
      onHoverLeft();
    }
  };

  return (
    <StyledButton
      style={{ backgroundColor: color }}
      onClick={onClickButton}
      onMouseOver={onHoverButton}
      onMouseLeave={onHoverLeftButton}
    >
      {isClicked && value === 1 && connectedItemSize > 0 && (
        <StyledDiv fontWeight={"bold"} fontSize={"1.5em"}>
          {connectedItemSize}
        </StyledDiv>
      )}
    </StyledButton>
  );
};

export default gridButton;
