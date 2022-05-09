import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";

function CartPage({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItems = [];
    // redux user cart state에 불러올 상품이 있는지 확인
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, user.userData.cart));
      }
    }
  }, []);

  return <main>CartPage</main>;
}

export default CartPage;
