import React, { useState } from "react";
import { Slider, InputNumber, Row, Col, Collapse } from "antd";

const { Panel } = Collapse;

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
    250: "$150",
    300: "$300",
  };

  return (
    <Collapse defaultActiveKey={["2"]}>
      <Panel header="가격" key="2">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col lg={{ span: 20 }} xs={{ span: 22 }}>
            <Slider
              range
              min={0}
              max={300}
              marks={marks}
              step={10}
              defaultValue={[0, 300]}
              onChange={onChangeHandler}
            />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
}

export default PriceSlider;
