const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const { auth } = require("../middleware/auth");
const { default: async, timeout } = require("async");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  // 먼저 user collection에서 로그인 유저의 정보 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // 지금 장바구니 상품과 중복상품인지 검사
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    // 중복 상품 장바구니 추가
    if (duplicate) {
      User.findOneAndUpdate(
        {
          // 유저를 먼저 찾은 후 카트안의 중복 아이템을 잡아냄
          _id: req.user._id,
          "cart.id": req.body.productId,
        },
        {
          $inc: {
            // +1 카운트
            "cart.$.quantity": 1,
          },
        },
        // 업데이트된 정보를 출력
        { new: true },

        // 프론트에 전송
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );

      // 새 상품 장바구니 추가
    } else {
      User.findOneAndUpdate(
        // 카트를 업데이트할 유저를 찾음
        { _id: req.user._id },
        // 새상품 push
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },

        // 프론트에 전송
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });

          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
  //저장
});

router.get("/removeFormCart", auth, (req, res) => {
  // 먼저 장바구니 안에 내가 지우려고 한 상품을 지우기

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query.id } },
    },
    { new: true },

    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });
      // productcollection에서 현재 남아있는 상품들의 정보를 가져오기

      // productId를 기반으로 찾은 아이템(들)을 반환
      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, productInfo) => {
          if (err) return res.status(400).send(err);
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  // 세 가지 일을 해야 한다.

  // 1. User Collection/history 에 간단한 결제정보 저장
  // 2. Payment Collection 에 자세한 결제정보 저장
  // 3. Product Collection 안에 있는 sold 필드 정보 업데이트 시키기

  let history = [];
  let transactionData = {};

  // 0. 넣어줄 데아터 생성

  console.log(req.body.selectDetail);

  // 간단한 결제 정보 (history)
  req.body.selectDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  // 자세한 결제 정보 (transactionData)
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  // 1-1. DB collection/user에 history 정보 저장, 카트 비우기

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { history: history },
      // 변화. 카트를 비우기
      $set: { cart: req.body.restCartItem },
    },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      // 2. Payment Collection 에 자세한 결제정보 저장
      const payment = new Payment(transactionData);

      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        console.log(doc);
        // 3. Product Collection 안에 있는 sold 필드 정보 업데이트 시키기
        // 몇개의 상품이 팔렸는지 저장해주기

        let products = [];

        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        // first Item   quantity 2
        // second Item  quantity 3
        // ...

        // 내가 구매한 상품 하나하나를 전부 컨트롤
        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });

            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

module.exports = router;
