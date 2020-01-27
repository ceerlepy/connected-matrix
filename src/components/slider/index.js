import React, { useState } from "react";
import "./index.css";

const Slider = ({ onChangeSlider }) => {
  const [count, setCount] = useState(1);

  const onChange = event => {
    event.preventDefault();
    setCount(event.target.value);
    onChangeSlider(event.target.value);
  };

  return (
    <div className="slidecontainer">
      <input
        type="range"
        min="1"
        max="23"
        value={count}
        className="slider"
        id="myRange"
        style={{ width: 500, marginRight: 20 }}
        onChange={event => onChange(event)}
      ></input>
      <div className="flexCls">{count}</div>
    </div>
  );
};

export default Slider;
