import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductQnA from "./ProductQnA";
import ProductReview from "./ProductReview";
import ProductShippingAnnounce from "./ProductShippingAnnounce";
import classes from "./Product.module.css";
import productImg from "../../../assets/profile.jpg";
import testImg from "../../../assets/icon-grade1.png";
import testImg2 from "../../../assets/icons/kakaoLogin.png";
import { FaAngleUp, FaAngleDown, FaAngleRight } from "react-icons/fa";
import Card from "../../UI/Card";

const Product = () => {
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("productDetail");
  const [currentImg, setCurrentImg] = useState();
  const [orderValue, setOrderValue] = useState(1);
  const [order, setOrder] = useState([]);
  const { getIdx } = useParams();

  const realPrice =
    (currentData.price - currentData.price * (currentData.pDiscount / 100)) *
    orderValue;

  const setMenu = (e) => {
    setCurrentMenu(e.target.textContent);
  };
  const setPreviewImg = (e) => {
    setCurrentImg(e.target.src);
  };
  const setOrderAmount = (e) => {
    const regex = /^[0-9]+$/;
    if (regex.test(e.target.value)) {
      if (Number.parseInt(e.target.value) > 50) {
        alert("한 번에 주문 가능한 수량은 50개까지입니다");
        setOrderValue(Number.parseInt(1));
      } else {
        setOrderValue(Number.parseInt(e.target.value));
      }
    } else {
      setOrderValue("");
    }
  };
  const setOrderUp = () => {
    if (orderValue < 50) {
      setOrderValue(orderValue + 1);
    } else {
      alert("한 번에 주문 가능한 수량은 50개까지입니다");
      setOrderValue(1);
    }
  };
  const setOrderDown = () => {
    if (orderValue > 1) {
      setOrderValue(orderValue - 1);
    } else {
      setOrderValue(1);
    }
  };
  const sendOrderData = () => {
    navigate("/order", { state: { order } });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/product/api/get/productinfo/" + getIdx)
        .then((response) => {
          setCurrentData(response.data.result[0]);
          setCurrentImg(response.data.result[0].image);
        });
    };

    fetchData();
  }, []);

  console.log(currentData);

  useEffect(() => {
    setOrder([
      {
        title: currentData.title,
        sQuantity: orderValue,
        price:
          currentData.price - currentData.price * (currentData.pDiscount / 100),
        productId: currentData.productId,
        image: currentData.image,
        pDeliveryFee: currentData.pDeliveryFee,
      },
    ]);
  }, [currentData, orderValue]);
  return (
    <React.Fragment>
      <div className={classes["product-path"]}>
        <Link to={"/"}>홈</Link> <FaAngleRight />
        {/* 카테고리 대중소 */}
        <Link>{currentData.category1}</Link>
        {
          <>
            {currentData.category4 !== "" ? (
              <>
                <FaAngleRight /> <Link>{currentData.category2}</Link>
                <FaAngleRight /> <Link>{currentData.category3}</Link>
                <FaAngleRight /> <Link>{currentData.category4}</Link>
              </>
            ) : (
              <>
                {currentData.category3 !== "" ? (
                  <>
                    <FaAngleRight /> <Link>{currentData.category2}</Link>
                    <FaAngleRight /> <Link>{currentData.category3}</Link>
                  </>
                ) : (
                  <>
                    {currentData.category2 !== "" ? (
                      <>
                        <FaAngleRight /> <Link>{currentData.category2}</Link>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            )}
          </>
        }
      </div>
      <div className={classes["product-content"]}>
        <div className={classes["product-content-img"]}>
          <div className={classes["product-content-img-List"]}>
            {/* 이미지 클릭시 해당 이미지로 메인 이미지 변경 */}
            {/* DB 추가되면 동적처리 필요 */}
            <div className={classes["product-content-img-item"]}>
              <img src={currentData.image} alt="" onClick={setPreviewImg} />
            </div>
            <div className={classes["product-content-img-item"]}>
              <img src={testImg2} alt="" onClick={setPreviewImg} />
            </div>
            <div className={classes["product-content-img-item"]}>
              <img src={productImg} alt="" onClick={setPreviewImg} />
            </div>
          </div>
          <Card className={classes["product-content-img-main"]}>
            <img src={currentImg} alt="" />
          </Card>
        </div>
        <div className={classes["product-content-detail"]}>
          <div className={classes["product-content-detail-mall"]}>
            <h4>
              {
                // <>
                //   {currentData.category4 !== "" ? (
                //     <>
                //       <Link>{currentData.category4}</Link>
                //     </>
                //   ) : (
                //     <>
                //       {currentData.category3 !== "" ? (
                //         <>
                //           <Link>{currentData.category3}</Link>
                //         </>
                //       ) : (
                //         <>
                //           {currentData.category2 !== "" ? (
                //             <>
                //               <Link>{currentData.category2}</Link>
                //             </>
                //           ) : (
                //             <Link>{currentData.category1}</Link>
                //           )}
                //         </>
                //       )}
                //     </>
                //   )}
                // </>
                <Link>{currentData.mallname}</Link>
              }
            </h4>
            <h2>{currentData.title}</h2>
            <p>상품평 별점</p>
          </div>
          <div className={classes["product-content-detail-price"]}>
            {/* 할인율 */}
            <h3 className={classes["product-content-detail-price__discount"]}>
              {currentData.pDiscount}
              <span
                className={classes["product-content-detail-price__percent"]}
              >
                %
              </span>
            </h3>
            {/*  할인율 적용된 가격 */}
            <h2 className={classes["product-content-detail-price__realPrice"]}>
              {realPrice}원
            </h2>
            {/* 원가 */}
            <h3 className={classes["product-content-detail-price__price"]}>
              {currentData.price}원
            </h3>
          </div>
          <p className={classes["product-content-detail__getMile"]}>
            상품 구매시
            <span
              className={classes["product-content-detail__getMile__number"]}
            >
              {realPrice * 0.03}
            </span>
            마일리지 적립
          </p>
          <div className={classes["product-content-detail-deliveryInfo"]}>
            <span
              className={classes["product-content-detail-deliveryInfo__title"]}
            >
              배송
            </span>
            <span>상품 정보 참고</span>
          </div>
          <div className={classes["product-content-detail-order"]}>
            <div>
              <input
                type="text"
                className={classes["product-content-detail-order-input"]}
                value={orderValue}
                onChange={setOrderAmount}
              />
              <button
                className={classes["product-content-detail-order-up"]}
                onClick={setOrderUp}
              >
                <FaAngleUp />
              </button>
              <button
                className={classes["product-content-detail-order-down"]}
                onClick={setOrderDown}
              >
                <FaAngleDown />
              </button>
            </div>
            <div>
              <button
                className={classes["product-content-detail-order-btn-addcart"]}
              >
                장바구니 담기
              </button>
            </div>
            <div>
              <button
                className={classes["product-content-detail-order-btn-purchase"]}
                onClick={sendOrderData}
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
        <li
          className={currentMenu === "상품 상세" ? classes.click : ""}
          onClick={setMenu}
        >
          상품 상세
        </li>
        <li
          className={currentMenu === "상품평" ? classes.click : ""}
          onClick={setMenu}
        >
          상품평
        </li>
        <li
          className={currentMenu === "상품문의" ? classes.click : ""}
          onClick={setMenu}
        >
          상품문의
        </li>
        <li
          className={currentMenu === "상품배송교환" ? classes.click : ""}
          onClick={setMenu}
        >
          상품배송교환
        </li>
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
