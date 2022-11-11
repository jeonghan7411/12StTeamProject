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
// import { auth } from "./token/token";
// const auth = require("./token/token");
const cookie = require("cookie");
const { send } = require("process");

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

// id 중복 검사라서 get 사용
app.post("/duplication", (req, res) => {
  const { uId } = req.body;
  let sql = "SELECT COUNT(uId) FROM users WHERE uId = ?;";
  db.query(sql, [uId], (err, result) => {
    if (err) throw err;

    console.log(result[0]["COUNT(uId)"]);

    if (result[0]["COUNT(uId)"]) {
      res.send({ status: 409, message: "이미 존재하는 아이디입니다." });
    } else {
      res.send({ status: 200, message: "사용 가능한 아이디입니다." });
    }
  });
});

app.post("/regist", (req, res) => {
  const { uId, uName, uPasswd, uEamil, uPhone } = req.body;
  let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, ?, NULL, NULL, NOW())";
  bcrypt.hash(uPasswd, saltRounds, (err, hash_passwd) => {
    db.query(sql, [uId, uName, hash_passwd, uEamil, uPhone], (err) => {
      if (err) throw err;
      res.send({ status: 200 });
    });
  });
});

// app.post("/login", (req, res) => {
//   let sql = "SELECT * FROM users WHERE uId = ?;";
//   db.query(sql, [req.body.userID], (err, user) => {
//     if (user[0] === undefined) {
//       res.send({
//         status: 404,
//         message: "아이디를 찾을수 없습니다. 회원가입 페이지로 이동합니다.",
//       });
//     } else {
//       bcrypt.compare(req.body.userPW, user[0].uPasswd, (err, result) => {
//         if (result) {
//           res.send({
//             status: 200,
//             message: "로그인 성공",
//             id: user[0].uId,
//           });
//         } else {
//           res.send({
//             status: 400,
//             message: "아이디 또는 비밀번호를 확인해주세요.",
//           });
//         }
//       });
//     }
//   });
// });

// const token = () => {
//   return {
//     access(id) {
//       return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "15m",
//       });
//     },
//     refresh(id) {
//       return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: "180 days",
//       });
//     },
//   };
// };

app.post("/login", (req, res, next) => {
  const key = process.env.SECRET_KEY;
  const uId = "";
  let token = "";
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
          token = jwt.sign(
            {
              type: "JWT",
              uId: user[0].uId,
            },
            key,
            {
              expiresIn: "15m",
              issuer: "토큰발급자",
            }
          );

          return res.send({
            status: 200,
            message: "로그인 성공",
            token: token,
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

const auth = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  // 인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
    req.decoded = jwt.verify(req.headers.authorization, key);
    return next();
  } catch (error) {
    // 인증 실패
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};

app.get("/payload", auth, (req, res) => {
  const nickname = req.decoded.nickname;
  const profile = req.decoded.profile;
  return res.status(200).json({
    code: 200,
    message: "토큰이 정상입니다.",
    data: {
      nickname: nickname,
      profile: profile,
    },
  });
});

app.post("/updateuser", (req, res) => {
  const {
    updatePw,
    updatePhone,
    zipcode,
    updateAddressFirst,
    updateAddressSecond,
    updateEmail,
  } = req.body.updateUserInfo;
});

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
