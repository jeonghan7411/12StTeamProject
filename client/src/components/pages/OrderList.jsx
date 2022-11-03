import React from "react";

import { FaSearch, FaTimesCircle } from "react-icons/fa";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./OrderList.module.css";
import { useState } from "react";

const OrderList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  console.log(searchKeyword);
  return (
    <React.Fragment>
      <div className={classes.OrderList}>
        <form>
          <div className={classes["orderlist-wrap-title"]}>
            <div>
              <h2>주문목록</h2>
            </div>
            <div className={classes["orderlist-wrap-input"]}>
              <Input
                value={searchKeyword}
                placeholder={"주문한 상품을 검색할 수 있어요!"}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <div className={classes["orderlist-wrap-icon"]}>
                {searchKeyword.length > 0 && (
                  <button type="button" onClick={() => setSearchKeyword("")}>
                    <FaTimesCircle className={classes["reset-icon"]} />
                  </button>
                )}

                <button>
                  <FaSearch className={classes["search-icon"]} />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className={classes["orderlist-wrap-list"]}>
          <div>주문내역</div>
          <div>배송조회</div>
          <div>찜목록</div>
          <div>최근본상품</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
