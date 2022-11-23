require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(
  cors({
    origin: true,
    credentials: true,
  })
);

router.get("/api/get/orderList", (req, res) => {
  let sql = "SELECT * FROM ordertable ORDER BY idx DESC;";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/api/userlist", (req, res) => {
  let sql = "SELECT * FROM users ORDER BY idx DESC;";

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      result,
    });
  });
});

module.exports = router;
