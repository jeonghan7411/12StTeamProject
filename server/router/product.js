const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const cookieParser = require("cookie-parser");
const cors = require("cors");

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

router.get("/api/get/products", (req, res) => {
  let sql1 = "SELECT DISTINCT * FROM products;";
  let sql2 =
    "SELECT DISTINCT * FROM products ORDER BY products.pSellCount DESC LIMIT 0,100;";
  db.query(sql1 + sql2, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({ result });
    }
  });
});

router.get("/api/get/productinfo/:getIdx", (req, res) => {
  const { getIdx } = req.params;
  // console.log(getIdx);
  let sql1 = "SELECT * FROM products WHERE productId = ?;";
  let sql2 = "SELECT * FROM board WHERE productId = ? ORDER BY bId DESC;";
  db.query(sql1 + sql2, [getIdx, getIdx], (err, result, asd) => {
    if (err) {
      throw err;
    } else {
      res.send({ productData: result[0], productInquire: result[1] });
    }
  });
});

router.get("/api/get/products/category", (req, res) => {
  const type = req.query.type;
  let category = "";
  switch (type) {
    case "life":
      category = "생활/건강";
      break;
    case "digital":
      category = "디지털/가전";
      break;
    case "fashionaccessories":
      category = "패션잡화";
      break;
    case "fashionaccessories":
      category = "패션잡화";
      break;
    case "furniture":
      category = "가구/인테리어";
      break;
    case "maternity":
      category = "출산/육아";
      break;
    case "fashionclothes":
      category = "패션의류";
      break;
    case "foods":
      category = "식품";
      break;
    case "sportsleisure":
      category = "스포츠/레저";
      break;
  }
  // console.log(category);
  let sql1 =
    "SELECT * FROM products WHERE category1 = ? ORDER BY productId DESC limit 0, 20;";
  let sql1s = mysql.format(sql1, category);
  let sql2 = "SELECT DISTINCT category2 FROM products WHERE category1 = ?;";
  let sql2s = mysql.format(sql2, category);
  db.query(sql1s + sql2s, (err, result) => {
    if (err) {
      throw err;
    } else {
      const products = result[0];
      const category2 = result[1];
      res.send({ category, category2, products });
    }
  });
});

router.get("/api/get/productinfo/:getIdx", (req, res) => {
  const { getIdx } = req.params;
  let sql1 = "SELECT * FROM products WHERE productId = ?;";
  let sql2 = "SELECT * FROM board WHERE productId = ? ORDER BY bId DESC;";
  db.query(sql1 + sql2, [getIdx, getIdx], (err, result, asd) => {
    if (err) {
      throw err;
    } else {
      res.send({ productData: result[0], productInquire: result[1] });
    }
  });
});

router.get("/api/get/products/category/fetchdata", (req, res) => {
  const type = req.query.type;
  let category = "";
  switch (type) {
    case "life":
      category = "생활/건강";
      break;
    case "digital":
      category = "디지털/가전";
      break;
    case "fashionaccessories":
      category = "패션잡화";
      break;
    case "fashionaccessories":
      category = "패션잡화";
      break;
    case "furniture":
      category = "가구/인테리어";
      break;
    case "maternity":
      category = "출산/육아";
      break;
    case "fashionclothes":
      category = "패션의류";
      break;
    case "foods":
      category = "식품";
      break;
    case "sportsleisure":
      category = "스포츠/레저";
      break;
  }
  let startNum = Number.parseInt(req.query.startNum) || 0;
  let offsetNum = Number.parseInt(req.query.offsetNum) || 20;

  let sql1 =
    "SELECT * FROM products WHERE category1 = ? ORDER BY productId DESC LIMIT ?, ?;";
  let sql1s = mysql.format(sql1, [category, startNum, offsetNum]);

  db.query(sql1s, (err, result) => {
    if (err) {
      throw err;
    } else {
      const products = result;
      // console.log(products);
      res.send({
        products,
        startNum: products.length ? startNum + offsetNum : 0,
        offsetNum: offsetNum,
        moreData: products.length >= offsetNum ? true : false,
      });
    }
  });
});

router.get("/api/get/products/subcategory", (req, res) => {
  let sql1 = "SELECT DISTINCT category3 FROM products WHERE category2 = ?;";
  let sql1s = mysql.format(sql1, req.query.type2);
  let sql2 = "SELECT * FROM products WHERE category2 = ?";
  let sql2s = mysql.format(sql2, req.query.type2);

  db.query(sql1s + sql2s, (err, result) => {
    if (err) {
      throw err;
    } else {
      const category3 = result[0];
      const products = result[1];
      res.send({ category3, products });
    }
  });
});

router.get("/api/get/products/subcategory2", (req, res) => {
  let sql1 = "SELECT * FROM products WHERE category3 = ?;";
  // console.log(req.query.type3);
  db.query(sql1, [req.query.type3], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({ result });
    }
  });
});

module.exports = router;
