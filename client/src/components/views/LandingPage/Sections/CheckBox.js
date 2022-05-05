import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  // 눌려져 있는 아이템의 id를 담음
  const [checked, setChecked] = useState([]);

  const handleToggle = (key) => {
    // 누른 것의 index 구하기
    const currentIndex = checked.indexOf(key);

    // checked state에 지금 누른 checkbox가 있는지 확인
    const newChecked = [...checked];

    // 없다면 추가
    if (currentIndex === -1) {
      newChecked.push(key);
      // 있다면 빼기
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleFilters(newChecked);
  };

  console.log(checked);

  const renderCheckboxLists = () => {
    return (
      list &&
      list.map((item, index) => {
        return (
          <>
            <Checkbox
              onChange={(e) => {
                handleToggle(item.key);
                console.log(e.target);
              }}
              checked={checked.indexOf(item.key) === -1 ? false : true}
              key={index}
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
        <Panel header="This is panel header 1" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </main>
  );
}

export default CheckBox;
