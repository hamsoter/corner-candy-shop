import { Button, Descriptions, Modal } from "antd";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { genres, sizes } from "../../LandingPage/Sections/Datas";
import styles from "./Product.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";

function ProductInfo({ product, history }) {
  const genreVal = genres[product.genre + 1].value;

  const sizeVal = sizes[product.size + 1].value;

  const pathId = window.location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push("/user/cart");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const clickHandler = () => {
    dispatch(addToCart(pathId));
    showModal();
  };

  return (
    <section className={styles.productInfoBox}>
      <Descriptions title="꿈 정보">
        <Descriptions.Item label="작가">
          {product.writer.name}
        </Descriptions.Item>
        <Descriptions.Item label="장르">{genreVal}</Descriptions.Item>
        <Descriptions.Item label="사이즈">{sizeVal}</Descriptions.Item>
        <Descriptions.Item label="소개" span={3}>
          {product.description}
        </Descriptions.Item>
        <Descriptions.Item label="가격" span={3}>
          ${product.price}
        </Descriptions.Item>
      </Descriptions>

      <div>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          장바구니
        </Button>

        <Modal
          title="장바구니에 담았어요"
          visible={isModalVisible}
          onOk={() => handleOk(product._id)}
          onCancel={handleCancel}
          okText="장바구니로"
          cancelText="계속 쇼핑하기"
        >
          <p>확인하러 갈까요?</p>
        </Modal>
      </div>
    </section>
  );
}

export default withRouter(ProductInfo);
