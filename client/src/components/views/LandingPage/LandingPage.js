import { Button, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import ProductCard from "./ProductCard";
import CheckBox from "./Sections/CheckBox";

import { genres } from "./Sections/Datas";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  // 한번에 불러올 데이터양
  const [limit, setLimit] = useState(4);
  const [postSize, setPostSize] = useState(0);

  const loadMoreHandler = () => {
    let newSkip = skip + limit;

    const body = {
      skip: newSkip,
      limit: limit,
      loadMore: true,
    };
    fetchData(body);

    setSkip((prev) => prev + limit);
  };

  const fetchData = async (body) => {
    try {
      const result = await Axios.post("/api/product/products", body);

      if (body.loadMore) {
        setProducts([...products, ...result.data.products]);
      } else {
        setProducts(result.data.products);
      }
      setPostSize(result.data.postSize);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilters = () => {};

  useEffect(() => {
    const body = {
      skip: skip,
      limit: limit,
    };

    fetchData(body);
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

      <CheckBox
        list={genres}
        handleFilters={(filter) => {
          handleFilters(filters, "genres");
        }}
      ></CheckBox>

      {/* search */}

      {/* items */}

      <Row gutter={[16, 16]}>{productCards}</Row>
      {postSize >= limit && (
        <div className={styles.center}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </main>
  );
}

export default LandingPage;
