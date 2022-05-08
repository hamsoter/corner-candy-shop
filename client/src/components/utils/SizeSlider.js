import React, { useState } from "react";
import { Slider } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styles from "./SizeSlider.module.css";

function SizeSlider({ setSize }) {
  const [value, setValue] = useState(0);

  const handleChange = (val) => {
    setValue(val);
    setSize(`s${val}`);
  };

  const marks = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  };

  const formatter = (value) => {
    if (value === 1) return "티스푼보다 적은";
    if (value === 2) return "적은";
    if (value === 3) return "보통";
    if (value === 4) return "커다란";
    if (value === 5) return "어어어엄청 커다란!";
  };

  const min = 1;
  const max = 5;

  return (
    <div className={styles.iconWrapper}>
      <HeartOutlined className={`${styles.icon} ${styles.left}`} />
      <Slider
        marks={marks}
        tipFormatter={formatter}
        min={min}
        max={max}
        onChange={handleChange}
        value={value}
      />
      <HeartOutlined className={`${styles.icon} ${styles.right}`} />
    </div>
  );
}

export default SizeSlider;
