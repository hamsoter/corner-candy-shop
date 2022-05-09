import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage({ user }) {
  const dispatch = useDispatch();

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
        dispatch(getCartItems(cartItemIds, user.userData.cart));
      }
    }
  }, [user.userData]);

  return (
    <main>
      <h1>장바구니</h1>
      <div>
        <UserCardBlock
          products={user.cartDetail && user.cartDetail.product}
        ></UserCardBlock>
      </div>
    </main>
  );
}

export default CartPage;
