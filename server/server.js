// import
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const moment = require("moment");
require("dotenv").config();
const db = require("./db/db");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const saltRounds = 10;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());
//나중에 멀터 업로드 처리

// url
app.get("/api/get/products", (req, res) => {
  let sql = "SELECT DISTINCT * FROM products;";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({ result });
    }
  });
});
app.get("/api/get/productinfo/:getIdx", (req, res) => {
  console.log(req.params.getIdx);
  let sql = "SELECT * FROM products WHERE productId = ?;";
  db.query(sql, [req.params.getIdx], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({ result });
    }
  });
});

app.post("/regist", (req, res) => {
  console.log(req.body);
  const { uId, uName, uPasswd, uEamil, uPhone } = req.body;
  let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, ?, NULL, NULL, NOW())";

  db.query(sql, [uId, uName, uPasswd, uEamil, uPhone], (err) => {
    if (err) throw err;
    res.send({ message: "200" });
  });
});

app.post("/login", (req, res) => {
  let sql = "SELECT * FROM users WHERE uId = ?;";
  db.query(sql, [req.body.userID], (err, user) => {
    if (user[0] === undefined) {
      res.send({
        status: 404,
        message: "아이디를 찾을수 없습니다. 회원가입 페이지로 이동합니다.",
      });
    } else {
      bcrypt.compare(req.body.userPW, user[0].uPasswd, (err, result) => {
        if (result) {
          res.send({
            status: 200,
            message: "로그인 성공",
            id: user[0].uId,
          });
        } else {
          res.send({
            status: 400,
            message: "아이디 또는 비밀번호를 확인해주세요.",
          });
        }
      });
    }
  });
});

// cookie 로그인
// app.post("/login", (req, res) => {
//   let isUser = false;
//   const { userID, userPW } = req.body;
//   let cookies = cookie.parse(req.headers.cookie); //쿠키를 객체 타입으로 변경
//   console.log(cookies.user);

//   const sql = "SELECT * FROME users;";
//   db.query(sql, (err, rows, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rows);
//       rows.forEach((info) => {
//         if (info.uId === userID && info.uPW === userPW) {
//           isUser = true;
//         } else {
//           return;
//         }
//       });
//       if (isUser) {
//         const YOUR_SECRET_KEY = process.env.SECRET_KEY;

//         // accessToken jwt 생성하는 코도
//         //첫번쨰 인자로는 보낼 정보, 두번쨰 인자로는 비밀키.
//         const accessToken = jwt.sign(
//           {
//             userID,
//           },
//           YOUR_SECRET_KEY,
//           {
//             expiresIn: "1h",
//           }
//         );
//         res.cookie("user", accessToken);
//         res.status(200).json({
//           result: "ok",
//           accessToken,
//         });
//       } else {
//         res.status(400).json({
//           error: "invaild user",
//         });
//       }
//     }
//   });
// });

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



// https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=0c2e778ddcaff57dd5cdc2a2d1c91894&apiCode=ProductSearch&keyword=&option=Categories
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
