import { Button, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import ProductCard from "./ProductCard";

function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios.post("/api/product/products");
        console.log(result.data.products);
        setProducts(result.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const productCards = products.map((item, index) => {
    return (
      <ProductCard
        key={index}
        title={item.title}
        price={item.price}
        thumbSrc={item.thumbnail}
      ></ProductCard>
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.center}>text</div>

      {/* filter */}

      {/* search */}

      {/* items */}

      <Row gutter={[16, 16]}>{productCards}</Row>

      <div className={styles.center}>
        <button>더보기</button>
      </div>
    </main>
  );
}

export default LandingPage;
