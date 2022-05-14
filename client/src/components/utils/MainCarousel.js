import { Carousel } from "antd";
import React from "react";

import "../../../../img/ghostChan1.svg";
import banner1css from "../utils/banners/Banner1.module.css";

function MainCarousel() {
  const contentStyle = {
    height: "400px",
    color: "#fff",
    lineHeight: "400px",
    textAlign: "center",
    background: "#364d79",
  };

  const banner1 = (
    <div className={banner1css.item}>
      <div className={banner1css.imgBox}>
        <img
          className={`${banner1css.ghostchan1} ${banner1css["vibrate-2"]}`}
          src="https://user-images.githubusercontent.com/100299692/168422384-f684668f-924a-46da-80c4-1e2dd98ee2b8.svg"
          alt="울상 짓고 있는 유령"
        />
        <img
          className={`${banner1css.ghostchan2} ${banner1css["vibrate-1"]}`}
          src="https://user-images.githubusercontent.com/100299692/168422852-bb89567c-762c-4cfb-b9e2-ab43aea3b448.svg"
          alt="바들바들 떨고 있는 효과"
        />
      </div>
      <div className={banner1css.title}>
        <span className={banner1css.subTitle}>무더위를 시원하게...</span>
        <span className={banner1css.mainTitle}>악몽특집</span>
      </div>
      <span className={banner1css.content}>
        <span className={banner1css.content1}>
          유명 꿈 제작자 <br></br>「견디어라」의<br></br>신작 출시 기념
        </span>
        <span className={banner1css.content2}>마참내!</span>
      </span>
    </div>
  );

  return (
    <Carousel>
      <div>
        <h3 className={banner1css.bannerBox}>{banner1}</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}

export default MainCarousel;
