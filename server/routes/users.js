const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

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

module.exports = router;
