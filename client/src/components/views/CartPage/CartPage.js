import { ShoppingOutlined } from "@ant-design/icons";
import { Divider } from "antd";
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

  const removeFormCart = (productId, indexs, removeAction) => {
    // 리덕스의 state를 변경
    setShowPay(false); // 수정필요

    dispatch(removeCartItem(productId)).then((res) => {});

    removeAction(indexs);
    removePriceCalc();
  };

  //////////////// 가격 계산 ////////////////
  const removePriceCalc = (indexs) => {
    let total = 0;

    // 지운 index를 찾아 selectProduct 배열에서 제거
    selectedProduct.splice(indexs, 1);
    setSelectedProduct(selectedProduct);

    selectedProduct.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotalPrice(total);
  };

  const payBtnControl = (action, value) => {
    action(value);
  };

  // 결제 완료후
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
        priceCalculate();

        setShowPay(false);
        history.push({
          pathname: "/history",
          state: { success: true },
        });
      }
      return;
    });
  };

  const selectHandler = (indexs) => {
    let body = indexs.map((item) => {
      return user.cartDetail[item];
    });

    // 선택한 프로젝트의 가격 계산
    setSelectedProduct(body);
    priceCalculate(body);

    const cartItems = user.userData.cart;
    const cartDetails = user.cartDetail;
    const selectItems = body;

    const filterUnselected = cartItems.filter((cartItem) => {
      const isSelected = selectItems.find((selectItem) => {
        return selectItem._id === cartItem.id;
      });
      return !isSelected;
    });

    const filterUnselectedCartDetail = cartDetails.filter((cartItem) => {
      const isSelected = selectItems.find((selectItem) => {
        return selectItem._id === cartItem._id;
      });
      return !isSelected;
    });

    setUnSelect(filterUnselected);
    setUnSelectDetail(filterUnselectedCartDetail);
  };

  // 상품 수량 변경
  const productQuantityChange = (changeCount, itemId) => {
    dispatch(addToCart(itemId, changeCount));

    let total = 0;

    // 변경된 total 계산
    selectedProduct.map((item) => {
      if (item._id === itemId) {
        total += parseInt(item.price, 10) * changeCount;
      } else {
        total += parseInt(item.price, 10) * item.quantity;
      }
    });

    setTotalPrice(total);
  };

  const priceCalculate = (products) => {
    let total = 0;

    if (products) {
      products.map((item) => {
        total += parseInt(item.price, 10) * item.quantity;
        return total;
      });

      // select된 아이템이 있을 때만 계산
    } else if (!isNaN(selectedProduct)) {
      selectedProduct.map((item) => {
        total += parseInt(item.price, 10) * item.quantity;
        return total;
      });
    }

    setTotalPrice(total);
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
        dispatch(getCartItems(cartItemIds, user.userData.cart));
      }
    }

    if (cartItemIds.length === 0) {
      setShowPay(false);
    } else {
      setShowPay(true);
    }
  }, [user.userData, selectedProduct]);

  return (
    <main>
      <h1 style={{ marginTop: "3rem" }}>
        꿈바구니
        <ShoppingOutlined style={{ marginLeft: "0.5rem" }} />
      </h1>
      <div>
        <UserCardBlock
          products={user.cartDetail}
          removeItem={removeFormCart}
          selectHandler={selectHandler}
          quantityChange={productQuantityChange}
        ></UserCardBlock>
      </div>
      <Divider>계산</Divider>
      <h2 style={{ marginBottom: "2rem" }}>
        합계: $ {totalPrice.toLocaleString()}
      </h2>
      {showPay && totalPrice > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paypal
            payBtnControl={payBtnControl}
            price={totalPrice}
            showPay={showPay}
            onSuccess={transactionSuccess}
          />
        </div>
      )}
    </main>
  );
}

export default CartPage;
