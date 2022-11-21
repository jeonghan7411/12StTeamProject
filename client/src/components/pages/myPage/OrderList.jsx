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
import Pagination from "./Pagination";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";

const OrderList = () => {
  const [user, setUser] = useState();
  const [orderList, setOrderList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
        <div className={classes["select-wrap"]}>
          <label>표시할 게시물</label>
          <select
            // type={Number}
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="1">1개씩 보기</option>
            <option value="3">3개씩 보기</option>
            <option value="5">5개씩 보기</option>
            <option value="10">10개씩 보기</option>
          </select>
        </div>

        <div className={classes["orderlist-wrap-list"]}>
          {orderList.length === 0 && (
            <MyPageNullMsg
              text={"주문내역이 없습니다."}
              className={classes["orderlist-content-null"]}
              orderList={orderList}
            />
          )}
          {orderList.slice(offset, offset + limit).map((item, key) => {
            return <OrderItem orderList={item} key={key} />;
          })}

          {orderList.length != 0 && (
            <div>
              <Pagination
                total={orderList.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderList;
