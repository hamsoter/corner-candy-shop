import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Typography } from "antd";
import React from "react";
import { genres, sizes, moods } from "./InfoDatas";

import styles from "./ProductContent.module.css";

function ProductContent({ product }) {
  // find
  const findGenre = genres.find((item) => item.key === `g${product.genre}`);
  const findSize = sizes.find((item) => item.key === `s${product.size}`);
  const findMood = moods.find((item) => item.key === `m${product.mood}`);

  // ment values
  const genreMents = findGenre && findGenre.value;
  const sizeMent = findSize && findSize.value;

  const moodMent = findMood && findMood.value;

  console.log(moodMent);

  const { Paragraph } = Typography;

  const [ellipsis, setEllipsis] = React.useState(true);

  return (
    <section style={{ width: "100%" }}>
      <div className={styles.productDetailContent}>
        <h2 style={{ marginBottom: "1rem" }}>
          오늘 밤은, <br></br>
          <b>「 {product.title} 」</b> (으)로<br></br> 잠드는 건<br></br>
          어떤가요?
        </h2>
        <span>
          오늘 소개해드릴 꿈은 바로 <b>「 {product.writer.name} 」</b> 작가님의
          <b> 「 {product.title} 」</b> 입니다!
          <br></br>
          <br></br>이 작품은 <b>{genreMents && genreMents[0]}</b>
          <b>「 {genreMents && genreMents[1]} 」</b> 이네요!
          <br></br>꾸고 나서 <b>「 {moodMent} 」</b> 느낌의 영감을{" "}
          <b>「 {sizeMent} 」</b> 얻을 수 있을지도…♪
          <br></br>
          <br></br>
          벌써 가슴이 두근거리지 않나요?
        </span>
      </div>
      <Card style={{}} className={styles.description}>
        <h3>어떤 이야기...?</h3>
        <span>작가가 남긴 간단한 소개입니다.</span>
        <Divider></Divider>
        <div className={styles.content}>
          <div className={styles.userBox}>
            <Avatar
              className={styles.avatar}
              size={64}
              icon={<UserOutlined />}
            />
            <p
              style={{
                width: "100px",
                textAlign: "center",
              }}
            >
              {product.writer.name}
            </p>
          </div>
          <div className={styles.speechBubble}>
            <Paragraph
              className={styles.paragraph}
              ellipsis={
                ellipsis ? { rows: 3, expandable: true, symbol: "more" } : false
              }
            >
              {product.description}
            </Paragraph>
          </div>
        </div>
      </Card>
      <h3></h3>
    </section>
  );
}

export default ProductContent;
