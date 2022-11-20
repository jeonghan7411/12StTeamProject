import React, { useState, useEffect } from "react";

import Pagination from "react-js-pagination";

import { BsFillQuestionCircleFill } from "react-icons/bs";

import classes from "./ProductQnA.module.css";

const ProductQnA = ({ productInquire }) => {
  const [inquireData, setInquireData] = useState([]);

  // pagination ---------------------------------------------------------------------
  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  const perPage = 10;

  useEffect(() => {
    setInquireData(productInquire);

    // pagination --------------------------------------------------------------------
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [
    productInquire,
    currentPage,
    indexOfFirstQnA,
    indexOfLastQnA,
    inquireData,
    perPage,
  ]);

  return (
    <div className={classes.productQnA}>
      <h4 className={classes["productQnA-title"]}>
        상품 문의
        <span className={classes["productQnA-amount"]}>
          {inquireData.length}
        </span>
        건
      </h4>

      {inquireData.slice(indexOfFirstQnA, indexOfLastQnA).map((it, idx) => (
        <div key={idx} className={classes["productQnA-item"]}>
          <p className={classes["productQnA-item-writeInfo"]}>
            {`${it.uId} | ${it.bWriteDate}`}
          </p>
          <p className={classes["productQnA-item-title"]}>
            <BsFillQuestionCircleFill
              className={classes["productQnA-item-title__icon"]}
            />
            <span>{it.bTitle}</span>
          </p>
          <p className={classes["productQnA-item-content"]}>{it.bContent}</p>
        </div>
      ))}

      <div className={classes["productQnA-pagination"]}>
        <Pagination
          activePage={currentPage} // 현재 페이지
          itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
          totalItemsCount={inquireData.length} // 총 아이템 갯수
          pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
          prevPageText={"<"}
          nextPageText={">"}
          onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
        />
      </div>
    </div>
  );
};

export default ProductQnA;
