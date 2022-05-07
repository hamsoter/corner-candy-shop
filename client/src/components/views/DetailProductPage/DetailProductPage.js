import { Col, Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

function DetailProductPage({ match }) {
  const productId = match.params.productId;

  const [product, setProduct] = useState({});

  console.log(productId);

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
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* productimage */}
          <ProductImage imgSrc={product.thumbnail} />
        </Col>
        <Col lg={12} sm={24}>
          {/* productinfo*/}
          <ProductInfo product={product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
