import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Cartegory from "./Cartegory";
import HomeProducts from "./HomeProducts";

import classes from "./Home.module.css";

const Home = ({ data }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  // 로그아웃, 쿠키 지우기
  const handleLogout = async () => {
    await axios.get("http://localhost:5000/api/logout", {
      withCredentials: true,
    });
    window.alert("로그아웃");
    window.location("/");
  };

  useEffect(() => {
    const accessToken = async () => {
      await axios
        .get("http://localhost:5000/api/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === "timeout") {
            handleLogout();
          } else {
            setIsLogin(true);
            setUser(response.data);
          }
        });
    };
    accessToken();
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
