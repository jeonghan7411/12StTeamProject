import React from "react";

import Cartegory from "./Cartegory";

import classes from "./Home.module.css";
import { authCheck, handleLogout } from "../../../util/authCheck";
import SearchItem from "../search/SearchItem";

import bestlogo from "../../../assets/icons/best.png";
import lifelogo from "../../../assets/icons/life.png";
import clotheslogo from "../../../assets/icons/clothes.png";
import salelogo from "../../../assets/icons/sale.png";
import SaleProduct from "./SaleProduct";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ data, bestProduct }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Cartegory />
      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={bestlogo} alt="bestProduct" /> 12st 베스트 상품인데
            할인까지 !?
          </h3>
          <span
            className={classes["home-section__expansion"]}
            onClick={() => navigate("/productsBest")}
          >
            + 더보기
          </span>
        </div>
        <div className={classes["home-section-product"]}>
          {bestProduct.slice(0, 4).map((it, key) => (
            <SearchItem key={key} data={it} />
          ))}
        </div>
      </section>

      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={lifelogo} alt="bestProduct" /> 12st 생활필수템 !
          </h3>
          <span className={classes["home-section__expansion"]}>+ 더보기</span>
        </div>
        <div className={classes["home-section-product"]}>
          {data.slice(200, 204).map((it, key) => (
            <SearchItem key={key} data={it} />
          ))}
        </div>
      </section>

      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={clotheslogo} alt="bestProduct" /> 12st 내등에 호랑이 어흥
            !
          </h3>
          <span className={classes["home-section__expansion"]}>+ 더보기</span>
        </div>
        <div className={classes["home-section-product"]}>
          {data.slice(600, 604).map((it, key) => (
            <SearchItem key={key} data={it} />
          ))}
        </div>
      </section>

      <section className={classes["home-section"]}>
        <div className={classes["home-section__titleWrap"]}>
          <h3 className={classes["home-section__title"]}>
            <img src={salelogo} alt="bestProduct" /> 12st 지금안사면 일주일 뒤에
            더 비싸게 구매하겠지
          </h3>
          <span className={classes["home-section__expansion"]}>+ 더보기</span>
        </div>
        <div className={classes["home-section-saleProduct"]}>
          {data
            .filter((it) => it.pDiscount > 25)
            .slice(30, 48)
            .map((it, key) => (
              <SaleProduct key={key} data={it} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
