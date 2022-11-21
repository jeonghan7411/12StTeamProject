import React from "react";

import Card from "../../UI/Card";

import classes from "./SearchItem.module.css";

const SearchItem = ({ data }) => {
  return (
    <div className={classes.searchItem}>
      <Card className={classes["searchItem-img"]}>
        <img src={data.image} alt={data.title} />
      </Card>

      <div className={classes["searchItem-info"]}>
        <span className={classes["searchItem-info-logo"]}>{data.mallname}</span>
        <div className={classes["searchItem-info-title"]}>
          <p className={classes["searchItem-info-title__title"]}>
            {`${data.title.substring(0, 12)}...`}
          </p>
          <p className={classes["searchItem-info-title__review"]}>
            <span className={classes["searchItem-info-title__review__star"]}>
              ★
            </span>
            <span>{`상품평 ( ${data.pReviewCount} )`}</span>
            <span className={classes["searchItem-info-title__review__split"]}>
              |
            </span>

            <span>{`누적 판매량 ( ${data.pReviewCount} )`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
