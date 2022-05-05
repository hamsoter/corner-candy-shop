import { Card, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import styles from "./LandingPage.module.css";

function ProductCard({ thumbSrc, price, title }) {
  return (
    <Col lg={6} md={8} xs={12}>
      <Card
        style={{
          borderColor: "#E9D5DA",
          boxSizing: "border-box",
        }}
        cover={
          thumbSrc ? (
            <img
              className={styles.thumbnail}
              src={`http://localhost:5000/${thumbSrc}`}
            ></img>
          ) : (
            <div className={styles.noThumbnail}> </div>
          )
        }
        bodyStyle={{
          padding: 0,
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <div className={styles.cardInfo}>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.price}>$ {price.toLocaleString()}</h3>
        </div>
        <Meta />
      </Card>
    </Col>
  );
}

export default ProductCard;
