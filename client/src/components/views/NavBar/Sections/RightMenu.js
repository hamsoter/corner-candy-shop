/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Avatar, Badge, Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">가입</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="cart" style={{ paddingRight: "20px" }}>
          <Badge count={5}>
            <a
              href="/user/cart"
              style={{ marginRight: "-20px", color: "#66777" }}
            >
              <ShoppingCartOutlined
                style={{
                  fontSize: "20px",
                  marginBottom: "24px",
                }}
              />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/product/upload">꿈 등록</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
