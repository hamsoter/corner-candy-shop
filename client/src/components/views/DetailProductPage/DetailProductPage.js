import { Col, Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import styles from "./Sections/Product.module.css";

function DetailProductPage({ match }) {
  const productId = match.params.productId;

  const [product, setProduct] = useState({
    writer: { name: "" },
    genre: 0,
    size: 0,
  });

  const fetchData = async () => {
    try {
      const result = await Axios.get(
        // 결과를 하나만 가져오기 위한 &type=single
        `/api/product/product_by_id?id=${productId}&type=single`
      );
      setProduct(result.data.product[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1>{product.title}</h1>
      </div>

      <Row gutter={[16, 16]} style={{ padding: 0, margin: 0 }}>
        <Col lg={12} sm={24} style={{ padding: 0, margin: 0 }}>
          {/* productimage */}
          <ProductImage imgSrc={product.thumbnail} />
        </Col>
        <Col lg={12} sm={24} style={{ padding: 0, margin: 0 }}>
          {/* productinfo*/}
          <ProductInfo product={product} />
        </Col>
      </Row>
    </main>
  );
}

export default DetailProductPage;
