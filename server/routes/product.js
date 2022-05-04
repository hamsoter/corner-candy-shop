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

module.exports = router;
