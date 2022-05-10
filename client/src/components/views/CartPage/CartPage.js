import { Result } from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  getCartItems,
  onSuccessBuy,
  removeCartItem,
} from "../../../_actions/user_actions";
import Paypal from "../../utils/PayPal";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage({ user, history }) {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateTotalPrice = (cartDetail) => {
    let total = 0;

    if (cartDetail) {
      cartDetail.map((item) => {
        total += parseInt(item.price, 10) * item.quantity;
      });
    }

    setTotalPrice(total);
  };

  const removeFormCart = (productId) => {
    console.log(productId);
    // 리덕스의 state를 변경해야 함
    dispatch(removeCartItem(productId)).then((res) => {
      console.log(res);
    });
  };

  const transactionSuccess = (data) => {
    // 카트 비우기

    dispatch(
      onSuccessBuy({
        paymentData: data, // paypal에서 받은 데이터 전달
        cartDetail: user.cartDetail, // 카트정보 전달
      })
    ).then((res) => {
      if (res.payload.success) {
        // total 초기화
        calculateTotalPrice();
        // setShowSuccess(true);
        console.log("결제완");

        history.push("user/orderSuccess/fdsfdssdf");
      }
      return;
    });
  };

  useEffect(() => {
    let cartItemIds = [];
    // redux user cart state에 불러올 상품이 있는지 확인
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItemIds.push(item.id);
        });

        // 첫번째 인자로는 디테일 정보를 받아올 cartItemIds
        // 두 번째 인자로는 장바구니에 담긴 갯수를 받아올 카트 자체
        dispatch(getCartItems(cartItemIds, user.userData.cart)).then((res) => {
          calculateTotalPrice(res.payload);
        });
      }
    }
  }, [user.userData]);

  return (
    <main>
      <h1>장바구니</h1>
      <div>
        <UserCardBlock
          products={user.cartDetail}
          removeItem={removeFormCart}
        ></UserCardBlock>
      </div>
      <div>
        <h2>합계: $ {totalPrice.toLocaleString()}</h2>
      </div>
      <Paypal price={totalPrice} onSuccess={transactionSuccess}></Paypal>) : (
      <></>)
    </main>
  );
}

export default CartPage;
