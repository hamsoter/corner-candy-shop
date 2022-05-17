import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";

function ProductImage({ imgSrc }) {
  const [img, setImg] = useState("");

  useEffect(() => {
    if (imgSrc) {
      setImg(
        <div
          className={styles.thumbnail}
          style={{ backgroundImage: `url("http://localhost:5000/${imgSrc}")` }}
        ></div>
      );
    } else {
      setImg(
        <div className={styles.noThumbnail}>
          <span className={styles.noThumbText}>이미지가 없어요</span>
        </div>
      );
    }
  }, [imgSrc]);
  return <section className={styles.thumbnailBox}>{img}</section>;
}

export default ProductImage;
