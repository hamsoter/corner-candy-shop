import { Button, Col, Modal, Row } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";

import { genres, sizes } from "../../LandingPage/Sections/Datas";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { ShoppingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import styles from "./Product.module.css";
import btnStyles from "../../../utils/buttons.module.css";

function ProductInfo({ product, history }) {
  const user = useSelector((state) => state.user);

  const genreVal = genres[product.genre].value;
  const sizeVal = sizes[product.size].value;
  const pathId = window.location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const { confirm } = Modal;

  const showSuccessModal = () =>
    confirm({
      title: "바구니에 꿈을 담았어요!",
      icon: <ShoppingOutlined style={{ color: "#E8C07D" }} />,
      okText: "꿈바구니로",
      cancelText: "계속 쇼핑하기",
      okButtonProps: { className: btnStyles.button },
      cancelButtonProps: { className: btnStyles.ghostButton },
      okType: "primary",
      autoFocusButton: null,
      maskClosable: true,
      content: "확인하러 갈까요?",
      onOk() {
        dispatch(addToCart(pathId));
        history.push("/user/cart");
      },
      onCancel() {},
    });

  return (
    <Row className={styles.productInfoBox}>
      <Col lg={12} xs={24} className={styles.col}>
        <h3 className={styles.label}>장르:</h3>
        <h3>{genreVal}</h3>
      </Col>
      <Col lg={12} xs={24} className={styles.col}>
        <h3 className={styles.label}>작가:</h3>
        <h3>{product.writer.name}</h3>
      </Col>

      <Col lg={24} xs={24} className={styles.col}>
        <h3 className={styles.label}>가격:</h3>
        <h3>${product.price}</h3>
      </Col>

      <Col>
        <Button
          size="large"
          shape="round"
          type="danger"
          className={styles.cartBtn}
          onClick={() => {
            // 로그인한 유저만 장바구니에 담기 가능
            if (user.userData && !user.userData.isAuth) {
              history.push("/login");
            } else {
              showSuccessModal();
            }
          }}
        >
          꿈바구니에 담기
          <ShoppingOutlined />
        </Button>
      </Col>
      <h3></h3>
      {/* <Descriptions title="꿈 정보">
        <Descriptions.Item label="작가">
          {product.writer.name}
        </Descriptions.Item>
        <Descriptions.Item label="장르">{genreVal}</Descriptions.Item>
        <Descriptions.Item label="사이즈">{sizeVal}</Descriptions.Item>
        <Descriptions.Item label="소개" span={3}>
          <Paragraph
            ellipsis={
              ellipsis ? { rows: 3, expandable: true, symbol: "more" } : false
            }
          >
            {product.description}
          </Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="가격" span={3}>
          ${product.price}
        </Descriptions.Item>
      </Descriptions>

      <div>
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={showSuccessModal}
        >
          장바구니
        </Button>
      </div> */}
    </Row>
  );
}

export default withRouter(ProductInfo);
