import React from "react";

import { FaSearch, FaTimesCircle } from "react-icons/fa";
import Input from "../../UI/Input";
import classes from "./OrderList.module.css";
import { useState } from "react";
import OrderItem from "./OrderItem";

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
              <div className={classes["orderlist-input"]}>
                <Input
                  value={searchKeyword}
                  placeholder={"주문한 상품을 검색할 수 있어요!"}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>

              <div className={classes["orderlist-wrap-icon"]}>
                {searchKeyword.length > 0 ? (
                  <button type="button" onClick={() => setSearchKeyword("")}>
                    <FaTimesCircle className={classes["reset-icon"]} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchKeyword("")}
                    className={classes["dum-icon"]}
                  >
                    <FaTimesCircle />
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
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
