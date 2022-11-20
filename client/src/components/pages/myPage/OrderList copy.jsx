import React, { useEffect } from "react";
import { useState } from "react";

import OrderItem from "./OrderItem";

import { FaSearch, FaTimesCircle } from "react-icons/fa";
import classes from "./OrderList.module.css";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import axios from "axios";

const OrderList = () => {
  const [user, setUser] = useState();

  const [orderList, setOrderList] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // authCheck();
    // getUser(setUser);
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/orderlist", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setOrderList(response.data.result);
          }
        });
    };

    fetchData();
  }, []);

  console.log(searchKeyword);

  const searchDb = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/mypage/searchlist", {
      withCredentials: true,
    });
  };

  return (
    <React.Fragment>
      <div className={classes.OrderList}>
        <form onSubmit={searchDb}>
          <div className={classes["orderlist-wrap-title"]}>
            <MyPageListTitle text={"주문 목록"} />

            <div className={classes["orderlist-wrap-input"]}>
              <div className={classes["orderlist-input"]}>
                <input
                  defaultValue={searchKeyword}
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
                  <FaSearch type="submit" className={classes["search-icon"]} />
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className={classes["orderlist-wrap-list"]}>
          {orderList.length === 0 && (
            <MyPageNullMsg
              text={"주문내역이 없습니다."}
              className={classes["orderlist-content-null"]}
              orderList={orderList}
            />
          )}
          {orderList.map((item, key) => {
            return <OrderItem orderList={item} key={key} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
