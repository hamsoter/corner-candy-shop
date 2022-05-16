import { Button, Checkbox, Modal } from "antd";
import React, { useState } from "react";

function Popup(props) {
  // const [isModalVisible, setIsModalVisible] = useState(props.flag);
  const [selCheck, setSelCheck] = useState(false);

  const handleCancel = () => {
    props.closePopup(selCheck);
    // setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={true}
        onCancel={handleCancel}
        maskClosable={false}
        okText={""}
        footer={[
          <Checkbox
            key="selcheck"
            onChange={() => {
              setSelCheck(!selCheck);
            }}
          >
            하루동안 보지 않기
          </Checkbox>,
          <Button
            key="back"
            style={{
              backgroundColor: "#827397",
              color: "white",
              borderColor: "#827397",
            }}
            onClick={handleCancel}
          >
            닫기
          </Button>,
        ]}
      >
        <h2>잠깐만요! 저는 잠옷경찰입니다!</h2>
      </Modal>
    </>
  );
}

export default Popup;
