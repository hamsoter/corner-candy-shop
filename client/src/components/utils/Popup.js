import { Button, Checkbox, Modal } from "antd";
import React, { useState } from "react";

import styles from "./ModalBody.module.css";

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
        bodyStyle={{
          backgroundColor: "#57837B",
        }}
        maskStyle={{}}
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
            잠옷을 받고 닫기
          </Button>,
        ]}
      >
        <div className={styles.modalbody}>
          <h1>잠깐만요! </h1>
          <h2>
            저는 잠옷경찰입니다! <br></br> 잠옷을 입어주세요.
          </h2>
          <img
            alt="경찰모를_쓴_달팽이_그림"
            className={styles["shake-horizontal"]}
            src="https://user-images.githubusercontent.com/100299692/168729952-1ee450d0-a871-4372-b4ad-640b9d2233b6.svg"
          />
          <div className={styles.modalbottom}>
            여기 제가 잠옷을 준비해뒀어요.
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Popup;
