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

router.get("/getbasket", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT COUNT(uId) FROM shoppingbasket WHERE uId = ?;";

    db.query(sql, [data.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send({
        count: result,
      });
    });
  });
});

// router.post("/searchlist", (req, res) => {
//   const uId = req.body.orderList[0].uId;
//   const keyWord = "%" + req.body.searchKeyword + "%";
//   let sql = "SELECT * FROM ordertable WHERE uId = ? AND ptitle like ?";
//   console.log(req.body);
//   db.query(sql, [uId, keyWord], (err, orderResult) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send({
//         result: orderResult,
//       });
//     }
//   });
// });

router.get("/api/login/getuser", (req, res) => {
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

router.get("/api/orderlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      let ordertable =
        "SELECT * FROM ordertable INNER JOIN products ON ordertable.pId = products.productId WHERE uId = ? ORDER BY idx DESC;";

      db.query(ordertable, [user[0].uId], (err, result) => {
        if (err) {
          throw err;
        }
        res.send({
          status: 200,
          result,
        });
      });
    });
  });
});

router.post("/api/updateuser", (req, res) => {
  const {
    idx,
    uName,
    uPasswd,
    uPhone,
    uEmail,
    uBirth,
    uZipcode,
    uAddress,
    uAdditionalAddr,
  } = req.body;

  console.log(
    idx,
    uName,
    uPasswd,
    uPhone,
    uEmail,
    uBirth,
    uZipcode,
    uAddress,
    uAdditionalAddr
  );
  let sql =
    "update users set uName=?, uPasswd=?, uEmail=?, uPhone=?, uZipcode=?,uAddress=?,uBirth=?,uAdditionalAddr =? where idx = ?;";

  bcrypt.hash(uPasswd, saltRounds, (err, hash_passwd) => {
    db.query(
      sql,
      [
        uName,
        hash_passwd,
        uEmail,
        uPhone,
        uZipcode,
        uAddress,
        uBirth,
        uAdditionalAddr,
        idx,
      ],
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

router.post("/api/checkingpw", (req, res) => {
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

router.post("/api/deleteuser", (req, res) => {
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

router.post("/api/adddeliver", (req, res) => {
  const { uId, uName, uPhone, uZipcode, uAddress, uAdditionalAddr, uMemo } =
    req.body;

  console.log(req.body);
  let sql = "INSERT INTO deliveryaddr VALUES(NULL,?,?,?,?,?,?,?);";
  db.query(
    sql,
    [uId, uName, uZipcode, uAddress, uAdditionalAddr, uPhone, uMemo],
    (err) => {
      if (err) {
        throw err;
      }
      res.send({
        status: 200,
        message: "신규 주소 등록완료",
      });
    }
  );
});

router.get("/api/addlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }

      let addrSql =
        "SELECT * FROM deliveryaddr where uId = ?  ORDER BY idx desc;";
      db.query(addrSql, [user[0].uId], (err, user) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, user });
        }
      });
    });
  });
});

router.post("/api/addrdelete", (req, res) => {
  const idx = req.body.addUser.idx;

  let sql = "DELETE FROM deliveryaddr WHERE idx = ?;";
  db.query(sql, [idx], (err) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      message: "삭제 완료",
    });
  });
});

router.post("/api/addrupdate", (req, res) => {
  const uIdx = parseInt(req.body.uIdx);
  console.log(req.body);
  const { uName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo } = req.body;

  let sql =
    "UPDATE deliveryaddr SET uName= ?,dZipcode =? ,dAddr =?,dAdditionalAddr=?,dPhone=?,dMemo=? WHERE idx =?;";
  db.query(
    sql,
    [uName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo, uIdx],
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ status: 200, message: "수정 완료" });
    }
  );
});

router.get("/api/boardlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }
      const uId = user[0].uId;

      let addrSql = "SELECT * FROM board where uId = ?  ORDER BY bId desc;";
      db.query(addrSql, [uId], (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, data });
        }
      });
    });
  });
});

router.post("/api/write", (req, res) => {
  const { uId, pId, bTitle, bBoardtype, bContent } = req.body;
  let sql = "INSERT INTO board VALUES (NULL,?,?,?,?,?,NOW())";

  db.query(sql, [uId, pId, bBoardtype, bTitle, bContent], (err) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      message: "작성 완료",
    });
  });
});

// router.post("/api/inquiry", (req, res) => {
//   const { uId, pId, bTitle, bBoardtype, bContent } = req.body;
//   let sql = "INSERT INTO board VALUES (NULL,?,?,?,?,?,NOW());";

//   db.query(sql, [uId, pId, bBoardtype, bTitle, bContent], (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send({
//       status: 200,
//       message: "작성 완료",
//     });
//   });
// });

router.get("/api/pointlist", (req, res) => {
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err) => {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    let sql = "SELECT * from users WHERE uId = ?;";
    db.query(sql, data.id, (err, user) => {
      if (err) {
        throw err;
      }
      const uId = user[0].uId;

      let addrSql =
        "SELECT * FROM ordertable where uId = ?  ORDER BY idx desc;";
      db.query(addrSql, [uId], (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ status: 200, data });
        }
      });
    });
  });
});

module.exports = router;
