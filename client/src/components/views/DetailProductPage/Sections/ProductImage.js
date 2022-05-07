import React, { useEffect, useState } from "react";
import styles from "./ProductImage.module.css";

function ProductImage({ imgSrc }) {
  const [img, setImg] = useState("");

  console.log(styles);

  useEffect(() => {
    if (imgSrc) {
      console.log(imgSrc);

      setImg(
        <img
          className={styles.thumbnail}
          src={`http://localhost:5000/${imgSrc}`}
        ></img>
      );
    } else {
      console.log("이미지가 없어요");
      setImg(<div className={styles.noThumbnail}></div>);
    }
  }, [imgSrc]);
  return (
    <section>
      <div className={styles.thumbnailDiv}>{img}</div>
    </section>
  );
}

export default ProductImage;
