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
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { send } = require("process");

const saltRounds = 10;

// middleware
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
app.post("/orderComplete", (req, res) => {
  console.log(req.body);
  const {
    uId,
    pId,
    oQuantity,
    oName,
    oPhone,
    oZipcode,
    oAddr,
    oAdditionalAddr,
    oMemo,
    oUseMile,
    oGetMile,
    oMethod,
    oTotalPrice,
  } = req.body;

  let sql1 =
    "INSERT INTO orderTable VALUES( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());";

  let sql2 = "UPDATE users SET uMile = uMile-?+? WHERE uid = ?;";
  db.query(
    sql1 + sql2,
    [
      uId,
      pId,
      oQuantity,
      oName,
      oPhone,
      oZipcode,
      oAddr,
      oAdditionalAddr,
      oMemo,
      oUseMile,
      oGetMile,
      oMethod,
      oTotalPrice,
      oUseMile,
      oGetMile,
      uId,
    ],
    (err) => {
      if (err) throw err;
    }
  );
});

app.post("/order/get/userData", (req, res) => {
  const uId = req.body.uId;

  let sql1 =
    "SELECT uId, uName, uEmail, uZipcode, uAddress,  uPhone, uMile, uEmail FROM users WHERE uId = ?;";

  let sql2 = "SELECT * FROM deliveryaddr WHERE uId = ?;";

  db.query(sql1 + sql2, [uId, uId], (err, results, field) => {
    if (err) throw err;

    res.send({ userData: results[0], deliveryData: results[1] });
  });
});

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
  const { uId, uName, uPasswd, uEamil, uPhone, uZipcode, uAddress, uBirth } =
    req.body;
  let sql =
    "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, ?, ?, ? , 1000, ?, 1, NOW());";
  bcrypt.hash(uPasswd, saltRounds, (err, hash_passwd) => {
    db.query(
      sql,
      [uId, uName, hash_passwd, uEamil, uPhone, uZipcode, uAddress, uBirth],
      (err) => {
        if (err) throw err;
        res.send({ status: 200 });
      }
    );
  });
});

// 로그인 구현, 비밀번호 비크립트만 추가해서 수정하기 레지스트 끝나고나면
app.post("/api/login", (req, res) => {
  let isUser = false;
  const { userID, userPW } = req.body;
  console.log(userID);
  console.log(userPW);
  let sql = "SELECT * from users where uId = ? AND uPasswd = ?;";
  db.query(sql, [userID, userPW], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      const userData = rows[0];

      if (userData.uId === userID && userData.uPasswd === userPW) {
        isUser = true;
      } else {
        return;
      }
      if (isUser) {
        const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
        const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
        //accessToken 발급
        const accessToken = jwt.sign(
          {
            id: userData.uId,
          },
          ACCESS_SECRET_KEY,
          {
            expiresIn: "10m",
            issuer: "12St",
          }
        );
        //refreshToken 발급
        const refreshToken = jwt.sign(
          {
            id: userData.uId,
          },
          REFRESH_SECRET_KEY,
          {
            expiresIn: "24h",
            issuer: "12St",
          }
        );
        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.status(201).json({
          result: "ok",
          accessToken,
        });
      } else {
        res.status(400).json({ error: "invalid user" });
      }
    }
  });
});

//로그인 검증
app.get("/api/login/success", (req, res) => {
  const token = req.cookies.accessToken;
  const reftoken = req.cookies.refreshToken;

  //리프레시토큰 유효성검사, expired 되면 강제로그아웃
  if (reftoken !== undefined) {
    jwt.verify(reftoken, process.env.REFRESH_SECRET_KEY, (err) => {
      if (err) {
        res.send("timeout");
        console.log("리프레시토큰만료");
      } else {
        return;
      }
    });
  }
  if (token === undefined) {
    //토큰이 없을때 -> 비로그인상태 = 리턴
    return;
  } else {
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
      // 토큰이 있을때 에러핸들링
      if (err) {
        // err = expired, 만료되었을때 리프레쉬
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
            process.env.ACCESS_SECRET_KEY,
            {
              expiresIn: "10m",
              issuer: "12St",
            }
          );

          res.cookie("accessToken", accessToken, { httpOnly: true });
          res.status(201).json({
            result: "ok",
            accessToken,
          });
          console.log("액세스토큰만료 재발급");
        });
      }
    });
  }
});
//로그아웃

app.get("/api/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json("Logout Success");
});

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

app.get("/mypage", (req, res) => {
  const token = req.cookies.accessToken;

  if (token === undefined) {
    res.send({
      status: 401,
      message: "로그인 정보가 없습니다.",
    });
  } else {
    res.send({
      status: 200,
      message: "환영합니다.",
      token,
    });
  }
});

app.get("/api/login/getuser", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      res.send(user[0]);
    });
  });
});

app.post("/updateuser", (req, res) => {
  const id = req.body.user.uId;
  const name = req.body.user.uName;
  const passwd = req.body.user.uPasswd;
  const email = req.body.user.uEmail;
  const phone = req.body.user.uPhone;
  const zipcode = req.body.user.uZipcode;
  const address = req.body.user.uAddress;
  const birth = req.body.user.uBirth;
  const detail = req.body.user.uDetail;

  let sql =
    "update users set uName=?, uPasswd=?, uEmail=?, uPhone=?, uZipcode=?,uAddress=?,uBirth=?,uAdditionalAddr =? where uId = ?;";

  bcrypt.hash(passwd, saltRounds, (err, hash_passwd) => {
    db.query(
      sql,
      [name, hash_passwd, email, phone, zipcode, address, birth, detail, id],
      (err) => {
        if (err) {
          throw err;
        }
        console.log("ok");
        res.send({
          status: 200,
          message: "회원수정 완료",
        });
      }
    );
  });
});

app.post("/checkingpw", (req, res) => {
  const inputPw = req.body.checkInputPw;
  const dataPw = req.body.user.uPasswd;

  let sql = "SELECT * FROM users WHERE uId = ?";

  db.query(sql, [req.body.user.uId], (err, user) => {
    if (user[0] === undefined) {
      console.log("No UserData");
      res.send({
        status: 404,
        message: "해당 아이디 정보가 없습니다.",
      });
    } else {
      bcrypt.compare(inputPw, dataPw, (err, result) => {
        if (result) {
          console.log("사용자 인증");
          res.send({
            status: 200,
            message: "회원정보 인증 성공!",
            searchPw: dataPw,
          });
        } else {
          console.log("사용자 인증 실패");
          res.send({
            status: 400,
            message: "비밀번호를 확인해주세요.",
          });
        }
      });
    }
  });
});

app.post("/deleteuser", (req, res) => {
  const id = req.body.user.uId;
  let sql = "UPDATE users SET uAuth = ? WHERE uId = ?;";
  db.query(sql, [0, id], (err) => {
    if (err) {
      throw err;
    }
    console.log("회원 비활성화");
    res.send({
      status: 200,
      message: "탈퇴가 정상적으로 완료 되었습니다.",
    });
  });
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
