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

router.post("/api/getData", (req, res) => {
  const { searchValue } = req.body;
  const keyWord = `%${searchValue}%`;

  let sql =
    "SELECT * FROM products WHERE title LIKE ? OR mallname LIKE ? OR category1 LIKE ? OR category2 LIKE ? OR category3 LIKE ? OR category4 LIKE ? OR category3 LIKE ? OR category3 LIKE ?;";

  db.query(
    sql,
    [keyWord, keyWord, keyWord, keyWord, keyWord, keyWord, keyWord, keyWord],
    (err, result) => {
      res.send(result);
    }
  );
});

module.exports = router;
