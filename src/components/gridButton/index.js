import React from "react";
import StyledButton from "../../styleComponents/button";

const gridButton = props => {
  const {
    value,
    connectedItemSize,
    onClick,
    onHover,
    onHoverLeft,
    isHovered,
    isClicked,
    rowIndex,
    colIndex,
    filledColor,
    hoverColor
  } = props;
  let color = value === 1 ? filledColor : "white";
  color = value === 1 && isHovered ? hoverColor : color;

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

  let showButtonText =
    isClicked && !isHovered && value === 1 && connectedItemSize > 0;

  return (
    <StyledButton
      style={{
        backgroundColor: color,
        color: showButtonText ? "white" : color
      }}
      onClick={onClickButton}
      onMouseOver={onHoverButton}
      onMouseLeave={onHoverLeftButton}
    >
      {connectedItemSize}
    </StyledButton>
  );
};

export default gridButton;
