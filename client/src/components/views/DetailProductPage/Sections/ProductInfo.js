import { Button, Descriptions, Modal } from "antd";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { genres, sizes } from "../../LandingPage/Sections/Datas";
import styles from "./Product.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import ConfirmModal from "../../../utils/ConfirmModal";

function ProductInfo({ product, history }) {
  const genreVal = genres[product.genre].value;

  const sizeVal = sizes[product.size].value;

  const pathId = window.location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  console.log(isModalVisible);

  const clickHandler = () => {
    dispatch(addToCart(pathId));
    setIsModalVisible(true);
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

        <ConfirmModal
          title="장바구니에 담았어요"
          // modalFlag={isModalVisible}
          modalFlag={isModalVisible}
          setModalFlag={setIsModalVisible}
          okText="장바구니로"
          cancelText="계속 쇼핑하기"
          description="확인하러 갈까요?"
        ></ConfirmModal>
      </div>
    </section>
  );
}

export default withRouter(ProductInfo);
