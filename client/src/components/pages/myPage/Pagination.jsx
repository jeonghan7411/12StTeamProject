import React from "react";

import classes from "./Pagination.module.css";

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <React.Fragment>
      <div className={classes["page-wrap-button"]}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          // className={page === 1 && `${classes["check-button"]}`}
        >
          {`<`}
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aira-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          {`>`}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Pagination;
