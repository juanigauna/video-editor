import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./style.css";
const RangeVideoSlider = ({ onChange = () => {} }) => {
  const [value, setValue] = useState([0, 100]);
  return (
    <section>
      <RangeSlider
        id="range-slider-yellow"
        step={0.001}
        defaultValue={value}
        onInput={(values) => onChange({ start: values[0], end: values[1] })}
      />
    </section>
  );
};

export default RangeVideoSlider;
