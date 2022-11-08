import React from "react";
import classes from "./ProductCart.module.css";
import { useNavigate } from "react-router-dom";
const ProductCart = () => {
  const navigate = useNavigate();
  return (
    <div className={classes["productcart-wrapper"]}>
      <div className={classes["productcart-cart"]}>
        <div className={classes["productcart-cart-handler"]}>
          전체선택, 선택삭제버튼
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격, 바로구매</td>
              <td>배송비, X버튼</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
        <div className={classes["productcart-cart-list"]}>
          <table>
            <tr>
              <td>
                <input type={"radio"} />
              </td>
              <td>이미지</td>
              <td>상품명, 링크</td>
              <td>가격</td>
              <td>배송비</td>
            </tr>
          </table>
        </div>
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
              <strong>0</strong>원
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
              <strong style={{ fontSize: "20px" }}>0</strong>원
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
