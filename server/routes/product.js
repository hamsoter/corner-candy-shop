const express = require("express");
const multer = require("multer");
const router = express.Router();

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
    console.log(err);
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

module.exports = router;
