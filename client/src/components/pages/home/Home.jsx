import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Cartegory from "./Cartegory";
import HomeProducts from "./HomeProducts";

import classes from "./Home.module.css";
import { authCheck, handleLogout } from "../../../util/authCheck";

const Home = ({ data }) => {
  // 로그아웃, 쿠키 지우기

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <Banner />

      <Cartegory />

      <HomeProducts
        className={classes["home-section"]}
        title="12st 베스트 상품"
        data={data.slice(15, 20).map((dt, key) => {
          return dt;
        })}
      />
      <HomeProducts
        className={classes["home-section"]}
        title="12st 인기 상품"
        data={data.slice(300, 305).map((dt, key) => {
          return dt;
        })}
      />
      <HomeProducts
        className={classes["home-section"]}
        title="12st 상품"
        data={data.slice(400, 405).map((dt, key) => {
          return dt;
        })}
      />
    </div>
  );
};

export default Home;
