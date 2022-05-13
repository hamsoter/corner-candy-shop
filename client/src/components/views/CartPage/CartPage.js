import { Result } from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  addToCart,
  getCartItems,
  onSuccessBuy,
  removeCartItem,
} from "../../../_actions/user_actions";
import Paypal from "../../utils/PayPal";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage({ user, history }) {
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [showPay, setShowPay] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState([{}]);
  const [unSelect, setUnSelect] = useState();
  const [unSelectDetail, setUnSelectDetail] = useState();

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
    // 리덕스의 state를 변경해야 함
    setShowPay(false);
    dispatch(removeCartItem(productId)).then((res) => {});
  };

  const payBtnControl = (action, value) => {
    action(value);
  };

  // 결제
  const transactionSuccess = (data) => {
    // 카트 비우기

    dispatch(
      onSuccessBuy({
        paymentData: data, // paypal에서 받은 데이터 전달
        cartDetail: user.cartDetail, // 카트정보 전달
        selectDetail: selectedProduct,
        restCartItem: unSelect,
        restCartDetail: unSelectDetail,
      })
    ).then((res) => {
      if (res.payload.success) {
        // total 초기화
        calculateTotalPrice();
        // setShowSuccess(true);

        setShowPay(false);
        history.push("/history");
      }
      return;
    });
  };

  const selectHandler = (indexs) => {
    let body = indexs.map((item) => {
      return user.cartDetail[item];
    });

    setSelectedProduct(body);
    calculateTotalPrice(body);

    const cartItems = user.userData.cart;
    const cartDetails = user.cartDetail;
    const selectItems = body;

    const filterUnselected = cartItems.filter((cartItem) => {
      const isSelected = selectItems.find((selectItem) => {
        return selectItem._id == cartItem.id;
      });
      return !isSelected;
    });

    const filterUnselectedCartDetail = cartDetails.filter((cartItem) => {
      const isSelected = selectItems.find((selectItem) => {
        return selectItem._id == cartItem._id;
      });
      return !isSelected;
    });

    setUnSelect(filterUnselected);
    setUnSelectDetail(filterUnselectedCartDetail);
  };

  // 상품 수량 변경
  const productQuantityChange = (changeCount, itemId) => {
    console.log(itemId);

    dispatch(addToCart(itemId, changeCount));
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
          calculateTotalPrice([]);
        });
      }
    }

    if (cartItemIds.length === 0) {
      setShowPay(false);
    } else {
      setShowPay(true);
    }
  }, [user.userData]);

  return (
    <main>
      <h1 style={{ marginLeft: " 1rem" }}>꿈바구니</h1>
      <div>
        <UserCardBlock
          products={user.cartDetail}
          setTotalPrice={calculateTotalPrice}
          removeItem={removeFormCart}
          selectHandler={selectHandler}
          quantityChange={productQuantityChange}
        ></UserCardBlock>
      </div>
      <div>
        <h2>합계: $ {totalPrice.toLocaleString()}</h2>
      </div>
      {showPay && (
        <Paypal
          payBtnControl={payBtnControl}
          price={totalPrice}
          showPay={showPay}
          onSuccess={transactionSuccess}
        ></Paypal>
      )}
    </main>
  );
}

export default CartPage;
