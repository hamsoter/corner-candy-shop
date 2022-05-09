import React, { useState } from "react";
import { Table, Button } from "antd";
import styles from "../CartPage.module.css";
import { CloseOutlined, SmileOutlined } from "@ant-design/icons";

function UserCardBlock({ products }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(products);
  const data = [];
  const columns = [
    {
      title: "꿈 정보",
      dataIndex: "title",
      width: "70%",
    },
    {
      title: "개수",
      dataIndex: "quantity",
      width: "10%",
    },
    {
      title: "가격",
      dataIndex: "price",
      width: "20%",
    },
    {
      title: "삭제",
      dataIndex: "remove",
      width: "10%",
    },
  ];
  const clean = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  products &&
    products.forEach((item, index) => {
      console.log(item);
      data.push({
        key: index,
        quantity: `${item.quantity}`,
        price: `$ ${item.price.toLocaleString()}`,
        remove: (
          <Button
            danger
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1rem",
            }}
          >
            <CloseOutlined />
          </Button>
        ),
        title: item.thumbnail ? (
          <div className={styles.titleBox}>
            <img
              className={styles.thumbnail}
              src={`http://localhost:5000/${item.thumbnail}`}
            ></img>
            <span>{item.title}</span>
          </div>
        ) : (
          <div className={styles.titleBox}>
            <div className={styles.noThumbnail}>
              <SmileOutlined />
            </div>
            <span>{item.title}</span>
          </div>
        ),
      });
    });
  // for (let i = 0; i < 46; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  console.log(selectedRowKeys);

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
