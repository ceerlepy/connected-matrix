import React, { useState } from "react";

const Slider = ({ onChangeSlider }) => {
  const [count, setCount] = useState(0);

  const onChange = event => {
    event.preventDefault();
    setCount(event.target.value);
    onChangeSlider(event.target.value);
  };

  return (
    <div>
      <input
        id="slider"
        type="range"
        min="0"
        max="23"
        step="1"
        onChange={event => onChange(event)}
        style={{ width: 200 }}
      />
      {count}
    </div>
  );
};

export default Slider;
