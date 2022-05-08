import { Button, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { genres, sizes } from "../../LandingPage/Sections/Datas";
import styles from "./Product.module.css";

function ProductInfo({ product }) {
  const genreVal = genres[product.genre].value;
  const sizeVal = sizes[product.size].value;

  console.log(product.size);
  console.log(sizeVal);

  const clickHandler = (e) => {};

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
      </div>
    </section>
  );
}

export default ProductInfo;
