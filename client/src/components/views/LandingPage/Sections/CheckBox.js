import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  // 눌려져 있는 아이템의 id를 담음
  const [checked, setChecked] = useState([]);

  const handleToggle = (key) => {
    const keyNum = Number(key.split("g")[1]);
    // 누른 것의 index 구하기
    const currentIndex = checked.indexOf(keyNum);

    // checked state에 지금 누른 checkbox가 있는지 확인
    const newChecked = [...checked];

    // 없다면 추가
    if (currentIndex === -1) {
      newChecked.push(keyNum);

      // 있다면 빼기
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleFilters(newChecked);
  };

  const renderCheckboxLists = () => {
    return (
      list &&
      list.map((item, index) => {
        return (
          <>
            <Checkbox
              key={index}
              onChange={(e) => {
                handleToggle(item.key);
              }}
              checked={
                checked.indexOf(Number(item.key.split("g")[1])) === -1
                  ? false
                  : true
              }
            >
              <span>{item.value}</span>
            </Checkbox>
          </>
        );
      })
    );
  };

  return (
    <main>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="장르" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </main>
  );
}

export default CheckBox;
