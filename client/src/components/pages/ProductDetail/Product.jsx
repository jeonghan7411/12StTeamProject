import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductQnA from "./ProductQnA";
import ProductReview from "./ProductReview";
import ProductShippingAnnounce from "./ProductShippingAnnounce";
import classes from "./Product.module.css";
import productImg from "../../../assets/profile.jpg";
import testImg from "../../../assets/icon-grade1.png";
import testImg2 from "../../../assets/icons/kakaoLogin.png";

const Product = () => {
  const [currentMenu, setCurrentMenu] = useState("productDetail");
  const [currentImg, setCurrentImg] = useState(productImg);
  const getIdx = useParams();
  console.log(getIdx);

  const setMenu = (e) => {
    setCurrentMenu(e.target.textContent);
  };
  const setPreviewImg = (e) => {
    setCurrentImg(e.target.src);
    console.log(e.target.src);
  };
  return (
    <React.Fragment>
      <div className={classes["product-path"]}>
        상품 카테고리 링크 ex. 홈 > 생활용품 > 세제
      </div>
      <div className={classes["product-content"]}>
        <div className={classes["product-content-img"]}>
          <div className={classes["product-content-img-List"]}>
            {/* 이미지 클릭시 해당 이미지로 메인 이미지 변경 */}
            {/* DB 추가되면 동적처리 필요 */}
            <div>
              <img src={testImg} alt="" onClick={setPreviewImg} />
            </div>
            <div>
              <img src={testImg2} alt="" onClick={setPreviewImg} />
            </div>
            <div>
              <img src={productImg} alt="" onClick={setPreviewImg} />
            </div>
          </div>
          <div className={classes["product-content-img-main"]}>
            <img src={currentImg} alt="" />
          </div>
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
            <div>수량선택</div>
            <div>
              <button
                className={classes["product-content-detail-order-btn-addcart"]}
              >
                장바구니담기
              </button>
            </div>
            <div>
              <button
                className={classes["product-content-detail-order-btn-purchase"]}
              >
                구매하기
              </button>
            </div>
          </div>
          <div className={classes["product-content-detail-info"]}>
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
