import React from "react";
import { Icon } from "antd";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        backgroundColor: "#827397",
        color: "white",
        marginTop: "1rem",
        padding: " 2rem 5rem",
      }}
    >
      <p style={{ fontSize: "12px", margin: 0 }}>
        법인명 : 코너컴퍼니 | 대표자 : 냐무냐무 <br></br>
        오시는 길 : 잠들게 된 후 보랏빛 등불 길을 쭉 따라 오세요 <br></br>
        <br></br>
        Copyright © 2022 모퉁이꿈공방. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
