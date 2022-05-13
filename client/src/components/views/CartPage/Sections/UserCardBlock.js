import React, { useState } from "react";
import { Table, Button, Modal, InputNumber } from "antd";
import styles from "../CartPage.module.css";
import {
  CloseOutlined,
  ExclamationCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";

function UserCardBlock({
  products,
  removeItem,
  selectHandler,
  quantityChange,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { confirm } = Modal;

  const data = [];

  const columns = [
    {
      title: "꿈 정보",
      dataIndex: "title",
      width: "70%",
    },
    {
      title: "수량",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      title: "가격",
      dataIndex: "price",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "remove",
      width: "10%",
    },
  ];

  const showDeleteConfirm = (removeId, item) =>
    confirm({
      title: "이 꿈들을 몽땅 지울까요?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeItem(removeId, item, removeAction);
      },
      onCancel() {
        console.log("Cancel");
      },
    });

  // 지울시 selected key 목록 초기화
  const removeAction = (index) => {
    const restKeys = selectedRowKeys;
    restKeys.splice(index, 1);
    console.log("rest", restKeys);

    setSelectedRowKeys(restKeys);
    selectHandler(restKeys);
  };

  const onSelectChange = (items) => {
    console.log(items);
    selectHandler(items);
    setSelectedRowKeys(items);
  };

  // 수량 변경
  function onInputChange(value, itemId) {
    quantityChange(value, itemId);
  }

  // const

  products &&
    products.forEach((item, index) => {
      data.push({
        key: index,
        quantity: (
          <InputNumber
            min={1}
            max={100}
            defaultValue={item.quantity}
            onChange={(value) => {
              onInputChange(value, item._id);
            }}
          />
        ),
        price: `$ ${item.price.toLocaleString()}`,
        remove: (
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1rem",
            }}
            onClick={() => {
              showDeleteConfirm(item._id, index);
            }}
          >
            <CloseOutlined />
          </Button>
        ),
        title: item.thumbnail ? (
          <a href={`/product/${item._id}`} className={styles.titleBox}>
            <img
              className={styles.thumbnail}
              src={`http://localhost:5000/${item.thumbnail}`}
            ></img>
            <span>{item.title}</span>
          </a>
        ) : (
          <a href={`/product/${item._id}`} className={styles.titleBox}>
            <div className={styles.noThumbnail}>
              <SmileOutlined />
            </div>
            <span>{item.title}</span>
          </a>
        ),
      });
    });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

export default UserCardBlock;
