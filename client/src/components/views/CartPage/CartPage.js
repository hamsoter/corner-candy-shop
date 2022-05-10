import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage({ user }) {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotalPrice(total);
  };

  const removeFormCart = (productId) => {
    console.log(productId);
    // 리덕스의 state를 변경해야 함
    dispatch(removeCartItem(productId)).then((res) => {
      console.log(res);
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
          console.log(res.payload);
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
    </main>
  );
}

export default CartPage;
