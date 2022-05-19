import { Card, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import styles from "./LandingPage.module.css";

function ProductCard({ thumbSrc, price, title }) {
  const src = thumbSrc.replaceAll("\\", "/");
  console.log(src);
  return (
    <Col lg={6} md={8} xs={12}>
      <Card
        style={{
          boxSizing: "border-box",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 1px",
          overflow: "hidden",
          borderRadius: "0.2rem",
        }}
        cover={
          thumbSrc ? (
            <div
              className={styles.thumbnail}
              style={{
                // backgroundImage: `url(http://localhost:5000/${src})`,
                backgroundImage: `url(https://corner-dream-atelier.s3.ap-northeast-2.amazonaws.com/${src})`,
              }}
            ></div>
          ) : (
            <div className={styles.noThumbnail}></div>
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
