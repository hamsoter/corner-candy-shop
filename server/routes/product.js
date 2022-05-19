const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Product } = require("../models/Product");

const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

//=================================
//             product
//=================================

const storage = multer.diskStorage({
  // 파일 저장 위치
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(), // 접근 권한 설정
    bucket: "corner-dream-atelier",
    key(req, file, cb) {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, `${Date.now()}_${fileName}`);
    },
  }),
}).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      filePath: res.req.file.key,
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
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    // key 장르의 cheked 상태가 1개 이상일 경우
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          // price 최솟값, 최댓값
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      // writer에 넘겨진 uid값으로 User를 찾고 writer에 User 객체를 담음
      .populate("writer")
      // 기존에 불러온 데이터들은 skip
      .skip(skip)
      // limit만큼 건너뜀
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });

        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      // writer에 넘겨진 uid값으로 User를 찾고 writer에 User 객체를 담음
      .populate("writer")
      // 기존에 불러온 데이터들은 skip
      .skip(skip)
      // limit만큼 건너뜀
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });

        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

router.get("/product_by_id", (req, res) => {
  // productId를 이용하여 db에서 productid와 같은 상품의 정보를 가져옴

  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    // string 형태로 뭉쳐서 나온 아이디 목록을 배열로 변경
    let ids = req.query.id.split(",");

    productIds = ids.map((item) => {
      return item;
    });
  }

  // productId를 기반으로 찾은 아이템(들)을 반환
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
