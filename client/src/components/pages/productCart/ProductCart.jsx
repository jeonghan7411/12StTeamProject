import React from "react";
import classes from "./ProductCart.module.css";
const ProductCart = () => {
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
        <div>적립혜택</div>
        <div>결제 예정금액, 상품금액, 할인금액, 합계, 주문버튼</div>
      </div>
    </div>
  );
};

export default ProductCart;
