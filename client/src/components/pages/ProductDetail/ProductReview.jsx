import React, { useState } from "react";
import { useEffect } from "react";
import Pagination from "react-js-pagination";
import NoneReview from "./NoneReview";

import classes from "./ProductReview.module.css";
import Review from "./Review";

const ProductReview = ({ productInquire }) => {
  const [reviewData, setReviewData] = useState([]);

  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);

  const perPage = 10;

  useEffect(() => {
    setReviewData(productInquire.filter((it) => it.bBoardtype === "리뷰"));

    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [productInquire, currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

  return (
    <div className={classes.productReview}>
      <h4 className={classes["productReview-title"]}>
        상품 리뷰
        <span className={classes["productReview-amount"]}>
          {reviewData.length}
        </span>
        건
      </h4>

      {reviewData.length !== 0 &&
        reviewData
          .slice(indexOfFirstQnA, indexOfLastQnA)
          .map((it, key) => <Review key={key} data={it} />)}

      {reviewData.length === 0 && <NoneReview title={"리뷰"} />}
      <Pagination
        activePage={currentPage} // 현재 페이지
        itemsCountPerPage={perPage} // 한페이지당 보여줄 아이템 갯수
        totalItemsCount={reviewData.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // 페이지네이터 내에서 보여줄 페이지 범위
        prevPageText={"<"}
        nextPageText={">"}
        onChange={setCurrntPage} // 페이지가 바뀔때 핸들링해주는 함수
      />
    </div>
  );
};

export default ProductReview;
