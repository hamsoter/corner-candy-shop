const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../models/Product");

//=================================
//             product
//=================================

const storage = multer.diskStorage({
  // 파일 저장 위치
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      filename: res.req.filename,
    });
  });
});

router.post("/", (req, res) => {
  // 받아온 데이터를 DB에 저장

  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  // product collection에 들어있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    // writer에 넘겨진 uid값으로 User를 찾고 writer에 User 객체를 담음
    .populate("writer")
    // 기존에 불러온 데이터들은 skip
    .skip(skip)
    // limit만큼 건너뜀
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });

      console.log(products.length);
      return res
        .status(200)
        .json({ success: true, products, postSize: products.length });
    });
});

module.exports = router;
