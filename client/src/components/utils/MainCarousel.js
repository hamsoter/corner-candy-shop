import { Carousel, Divider } from "antd";
import React from "react";

import "../../../../img/ghostChan1.svg";
import banner1css from "../utils/banners/Banner1.module.css";
import banner2css from "../utils/banners/Banner2.module.css";

function MainCarousel() {
  const banner1 = (
    <div className={banner1css.item}>
      <div className={banner1css.imgBox}>
        <img
          className={`${banner1css.ghostchan1} ${banner1css["vibrate-2"]}`}
          src="https://user-images.githubusercontent.com/100299692/168422384-f684668f-924a-46da-80c4-1e2dd98ee2b8.svg"
          alt="울상_짓고_있는_유령"
        />
        <img
          className={`${banner1css.ghostchan2} ${banner1css["vibrate-1"]}`}
          src="https://user-images.githubusercontent.com/100299692/168422852-bb89567c-762c-4cfb-b9e2-ab43aea3b448.svg"
          alt="바들바들_떨고_있는_효과"
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

  const banner2 = (
    <div className={banner2css.item}>
      <img
        className={banner2css.sun}
        src="https://user-images.githubusercontent.com/100299692/168750514-23ce8a99-9270-4b45-8c62-ffe75eae58b2.svg"
      ></img>
      <img
        className={`${banner2css.usagi} ${banner2css["jello-horizontal"]}`}
        src="https://user-images.githubusercontent.com/100299692/168750528-63f5c31c-3e0f-4055-a9ac-b1717496800c.svg"
      />
      <div className={banner2css.memo}>
        <h2>Q. 꿈에서는 토끼를 설치할 수 있나요?</h2>
        <Divider></Divider>
        <h3>A. 네. 설치류니까...</h3>
      </div>
    </div>
  );

  return (
    <Carousel autoplay={true} autoplaySpeed={"30"} draggable={true}>
      <div>
        <h3 className={banner1css.bannerBox}>{banner1}</h3>
      </div>
      <div>
        <h3 className={banner2css.bannerBox}>{banner2}</h3>
      </div>
    </Carousel>
  );
}

export default MainCarousel;
