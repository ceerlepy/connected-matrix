import React from "react";
import InputColor from "react-input-color";

const ColorPicker = ({ text, type, onChangeColorPicker }) => {
  const [color, setColor] = React.useState({
    hex: type === "Filled" ? "#FF0000" : "#FFFF00"
  });

  const onChangeColor = colorObj => {
    let colorCode = colorObj.hex;
    if (colorCode.startsWith("#ff")) {
      type === "Filled" ? (colorCode = "#FF0000") : (colorCode = "#FFFF00");
    }
    setColor({ hex: colorCode });
    onChangeColorPicker(type, colorCode);
  };

  return (
    <div>
      <div style={{ marginLeft: 40, marginRight: 40 }}>{text}</div>
      <InputColor
        initialHexColor={color.hex}
        onChange={onChangeColor}
        placement="right"
      />
    </div>
  );
};

export default ColorPicker;
