import React from "react";
import ColorPicker from "../colorPicker";
import Slider from "../slider";
import Grid from "../grid";

const GridInitializer = () => {
  const [filledColor, setFilledColor] = React.useState("red");
  const [hoverColor, setHoverColor] = React.useState("yellow");
  const [matrixSize, setMatrixSize] = React.useState(1);

  const onChangeColorPicker = (type, colorHex) => {
    if (type === "Filled") {
      setFilledColor(colorHex);
    } else if (type === "Hover") {
      setHoverColor(colorHex);
    }
  };

  const onChangeSlider = size => {
    setMatrixSize(size);
  };

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <ColorPicker
          text="Matrix Filled Color"
          type="Filled"
          style={{ flex: 1 }}
          onChangeColorPicker={onChangeColorPicker}
        />
        <ColorPicker
          text="Matrix Hover Color"
          type="Hover"
          style={{ flex: 1 }}
          onChangeColorPicker={onChangeColorPicker}
        />
        <Slider style={{ flex: 100 }} onChangeSlider={onChangeSlider} />
      </div>
      <Grid
        filledColor={filledColor}
        hoverColor={hoverColor}
        matrixSize={matrixSize}
      />
    </React.Fragment>
  );
};

export default GridInitializer;
