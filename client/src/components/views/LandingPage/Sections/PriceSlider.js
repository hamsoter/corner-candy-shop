import React, { useState } from "react";
import { Slider, Row, Col, Collapse } from "antd";

import styles from "./col.module.css";

function PriceSlider({ handleFilters }) {
  const [price, setPrice] = useState([0, 300]);

  const onChangeHandler = (value) => {
    if (value[0] > value[1]) {
      return;
    }
    setPrice(value);
    handleFilters(value);
  };

  const marks = {
    0: "$0",
    50: "$50",
    100: "$100",
    150: "$150",
    200: "$200",
    250: "$250",
    300: "$300",
  };

  return (
    <div className={`${styles.right} ${styles.box}`}>
      <h3>가격</h3>
      <div>
        <Row className={`collapse-row right ${styles.row}`}>
          <Col lg={{ span: 20 }} xs={{ span: 22 }}>
            <div>
              <Slider
                range
                min={0}
                max={300}
                marks={marks}
                step={10}
                defaultValue={[0, 300]}
                onChange={onChangeHandler}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PriceSlider;
