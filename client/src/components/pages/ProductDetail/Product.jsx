import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductQnA from "./ProductQnA";
import ProductReview from "./ProductReview";
import ProductShippingAnnounce from "./ProductShippingAnnounce";
import classes from "./Product.module.css";
import productImg from "../../../assets/profile.jpg";

const Product = () => {
  const [currentMenu, setCurrentMenu] = useState("productDetail");

  const getIdx = useParams();
  console.log(getIdx);

  const setMenu = (e) => {
    setCurrentMenu(e.target.textContent);
  };
  return (
    <React.Fragment>
      <div className={classes["product-path"]}>
        상품 카테고리 링크 ex. 홈 > 생활용품 > 세제
      </div>
      <div className={classes["product-content"]}>
        <div className={classes["product-content-img"]}>
          <div className={classes["product-content-img-List"]}>
            <div>
              <img src={productImg} alt="" />
            </div>
            <div>
              <img src={productImg} alt="" />
            </div>
            <div>
              <img src={productImg} alt="" />
            </div>
          </div>
          <img src={productImg} alt="" />
        </div>
        <div className={classes["product-content-detail"]}>
          <div className={classes["product-content-detail-title"]}>
            <h4>상품 카테고리</h4>
            <h2>상품명</h2>
            <p>상품평 별점</p>
          </div>
          <div className={classes["product-content-detail-price"]}>
            가격 적립 등
          </div>
          <div className={classes["product-content-detail-shipping"]}>
            배송 방법 정리
          </div>
          <div className={classes["product-content-detail-order"]}>
            수량 선택, 장바구니 담기버튼, 바로구매버튼
          </div>
          <div>
            <li>상품정보</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </div>
        </div>
      </div>

      <div className={classes["product-infos"]}>
        <li onClick={setMenu}>상품 상세</li>
        <li onClick={setMenu}>상품평</li>
        <li onClick={setMenu}>상품문의</li>
        <li onClick={setMenu}>상품배송교환</li>
      </div>
      <div>
        {currentMenu === "상품평" ? (
          <ProductReview />
        ) : currentMenu === "상품문의" ? (
          <ProductQnA />
        ) : currentMenu === "상품배송교환" ? (
          <ProductShippingAnnounce />
        ) : (
          <ProductDetail />
        )}
      </div>
    </React.Fragment>
  );
};

export default Product;
