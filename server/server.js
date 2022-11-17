// import
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const moment = require("moment");
require("dotenv").config();
const mysql = require("mysql");
const db = require("./db/db");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { send } = require("process");
const mypage = require("./router/mypage");
const product = require("./router/product");
const order = require("./router/order");
const login = require("./router/login");
const regist = require("./router/regist");

// middleware
app.use("/mypage", mypage);
app.use("/product", product);
app.use("/regist", regist);
app.use("/order", order);
app.use("/login", login);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
//나중에 멀터 업로드 처리

// url

// 리프레시
/*
app.get("/api/login/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

  let sql = "SELECT * from users WHERE uId = ?;";
  db.query(sql, [data.id], (err, rows) => {
    if (err) {
      throw err;
    }
    //비밀번호 빼고 전달
    const { uPasswd, ...others } = rows[0];

    //accessToken 새로 발급
    const accessToken = jwt.sign(
      {
        id: others.uId,
      },
      ACCESS_SECRET_KEY,
      {
        expiresIn: "1m",
        issuer: "12St",
      }
    );

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.status(200).json("Access Token Recreated");
  });
});
*/

//네이버 api 받아와서 db에 넣은 흔적
/*
let data = [];

let client_id = "wuWicrMH0NCEgX2yYL1s";
let client_secret = "NqTst4k3ME";

app.get("/search/shop", (req, res) => {
  let api_url =
    "https://openapi.naver.com/v1/search/shop.json?query=" +
    encodeURI(req.query.query) +
    "&display=50&start=1001";
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
      let resres = JSON.parse(body);
      data = resres.items;
      let sql = "INSERT INTO products VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      for (let i = 0; i < data.length; i++) {
        db.query(
          sql,
          [
            data[i]["productId"],
            data[i]["title"],
            data[i]["image"],
            data[i]["lprice"],
            data[i]["mallName"],
            data[i]["category1"],
            data[i]["category2"],
            data[i]["category3"],
            data[i]["category4"],
          ],
          (err) => {
            if (err) throw err;
          }
        );
      }
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});




*/
// listen
app.listen(process.env.PORT, () => {
  let folder = "uploads";
  if (!fs.existsSync(folder)) {
    fs.mkdir(folder, (err) => {
      if (err) throw err;
      console.log("CREATE FOLDER COMPLETE");
    });
  }
  console.log("SERVER IS RUNNING... PORT = " + process.env.PORT);
});
