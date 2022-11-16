import React, { useState } from "react";
import classes from "./ProductCart.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../../util/getUser";
import { useEffect } from "react";
import { authCheck } from "../../../util/authCheck";
const ProductCart = () => {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //권한체크 겸 토큰갱신
    authCheck();
    // 사용자 장바구니 정보 가져오기
    const fetchCartData = async () => {
      await axios
        .get("http://localhost:5000/api/get/cartData", {
          withCredentials: true,
        })
        .then((response) => {
          setCart(response.data);
        });
    };

    // 사용지 정보 가져오기
    const fetchUserData = async () => {
      await axios
        .get("http://localhost:5000/mypage", { withCredentials: true })
        .then((response) => {
          if (response.data.status === 401) {
            alert(response.data.message);
            navigate("/login", { replace: true });
          } else if (response.data.status === 200) {
            getUser(setUser);
          }
        });
    };
    console.log(cart);

    fetchUserData();
    fetchCartData();
    // console.log(cart);
  }, []);

  return (
    <div className={classes["productcart-wrapper"]}>
      <div className={classes["productcart-cart"]}>
        <div className={classes["productcart-cart-handler"]}>
          전체선택, 선택삭제버튼
        </div>

        {cart.map((data, idx) => (
          <div key={idx} className={classes["productcart-cart-list"]}>
            <table>
              <tr>
                <td>
                  <input type={"radio"} />
                </td>
                <td className={classes["productcart-cart-list__img"]}>
                  <img src={data.image} alt={data.title} />
                </td>
                <td>{data.title}</td>
                <td>{data.price}원</td>
                <td>{data.pDeliveryFee}, X버튼</td>
              </tr>
            </table>
          </div>
        ))}
      </div>

      <div className={classes["productcart-order"]}>
        <div className={classes["productcart-order-point"]}>
          <h3>적립혜택</h3>
          <p>적립 혜택이 없습니다.</p>
        </div>
        <div className={classes["productcart-order-purchase"]}>
          <h3>결제 예정금액</h3>
          <div className={classes["productcart-order-purchase-product"]}>
            <h4>상품금액</h4>
            <p>
              <strong>{cart.reduce}</strong>원
            </p>
          </div>
          <div className={classes["productcart-order-purchase-discount"]}>
            <h4>할인금액</h4>
            <p>
              <strong>0</strong>원
            </p>
          </div>
          <div className={classes["productcart-order-purchase-total"]}>
            <h4>합계</h4>
            <p>
              <strong style={{ fontSize: "20px" }}>{totalPrice}</strong>원
            </p>
          </div>
          <div className={classes["productcart-order-purchase-btn"]}>
            {/* 여기 주문하기 온클릭 링크 나중에 노드로 바꾸고 노드에서 리다렉 */}
            <input
              type={"button"}
              value="주문하기"
              onClick={() => navigate("/order")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
