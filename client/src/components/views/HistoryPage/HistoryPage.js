import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Table, Space, Modal } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import btnStyles from "../../utils/buttons.module.css";

function HistoryPage({ user, location }) {
  const { info } = Modal;

  const showConfirmModal = () =>
    info({
      title: "주문이 완료되었습니다!",
      icon: <CheckCircleOutlined style={{ color: "#36AE7C" }} />,
      okText: "녜!",
      okButtonProps: { className: btnStyles.button },
      maskClosable: true,
      autoFocusButton: null,
      okType: "primary",
      content: (
        <span>
          고객님의 소중한 꿈이 오늘 수면 중에 배송될 예정입니다.
          <br></br>
          원하시는 꿈과 달콤한 잠 주무시길 바랍니다.
        </span>
      ),
      onOk() {},
      onCancel() {},
    });

  useEffect(() => {
    // 주문 페이지에서 결제하고 넘어온 경우
    if (location.state && location.state.success) {
      showConfirmModal();
    }
  }, [location]);
  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "주문번호",
      dataIndex: "paymentId",
      key: "paymentId",
      ellipsis: true,
    },
    {
      title: "지불액",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "결제일",
      dataIndex: "dateOfPurchase",
      key: "dateOfPurchase",
    },
  ];

  const arr =
    user.userData &&
    user.userData.history.map((item, index) => {
      const body = {
        ...item,
        key: index,
        dateOfPurchase: new Date(item.dateOfPurchase).toLocaleDateString(),
      };
      return body;
    });

  return (
    <main>
      <Table columns={columns} dataSource={arr} />
    </main>
  );
}

export default HistoryPage;
