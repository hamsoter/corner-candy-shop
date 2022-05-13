import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const CornfirmModal = ({
  link,
  history,
  title,
  description,
  okText,
  cancelText,
  modalFlag,
  setModalFlag,
}) => {
  const handleCancel = () => {
    setModalFlag(false);
  };

  const handleOk = (link) => {
    setModalFlag(false);
    if (link) {
      history.push(link);
    }
  };

  return (
    <>
      <Modal
        title={title}
        visible={modalFlag}
        onOk={() => handleOk()}
        onCancel={handleCancel}
        okText={okText ? okText : "녜"}
        cancelText="아뇨"
      >
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default withRouter(CornfirmModal);
