const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const db = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const saltRounds = 10;

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

router.get("/api/get/cartData", (req, res) => {
  const token = req.cookies.accessToken;
  const data = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

  let sql =
    "SELECT * FROM products INNER JOIN shoppingbasket ON products.productId = shoppingbasket.productId where uId = ? ORDER BY idx DESC;";

  db.query(sql, [data.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/api/order/Complete", (req, res) => {
  const { orderData, user, oUseMile, oGetMile, oMethod } = req.body;
  orderData.forEach((data) => {
    let sql =
      "INSERT INTO orderTable VALUES( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());";
    db.query(
      sql,
      [
        user.uId,
        data.productId,
        data.amount,
        user.uName,
        user.uPhone,
        user.uZipcode,
        user.uAddress,
        user.uAdditionalAddr,
        "메모",
        oUseMile,
        oGetMile,
        oMethod,
      ],
      (err) => {
        if (err) throw err;
      }
    );
  });

  sql = "UPDATE users SET uMile = uMile-?+? WHERE uid = ?;";
  db.query(sql, [oUseMile, oGetMile, user.uId], (err) => {
    if (err) throw err;
  });
});

router.post("/api/order/get/userData", (req, res) => {
  const uId = req.body.uId;

  let sql1 =
    "SELECT uId, uName, uEmail, uZipcode, uAddress, uAdditionalAddr, uPhone, uMile, uEmail FROM users WHERE uId = ?;";

  let sql2 = "SELECT * FROM deliveryaddr WHERE uId = ?;";

  db.query(sql1 + sql2, [uId, uId], (err, results, field) => {
    if (err) throw err;

    res.send({ userData: results[0], deliveryData: results[1] });
  });
});

module.exports = router;
