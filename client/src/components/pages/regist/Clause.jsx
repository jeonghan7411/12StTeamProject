import React from "react";

import classes from "./Clause.module.css";

const Clause = () => {
  return (
    <section className={classes.clause}>
      <div className={classes["clause-contentWrap"]}>
        <div>
          <input type="checkbox" /> 전체 약관에 동의합니다.
        </div>

        <div className={classes["clause-content"]}></div>
        <div>
          <input type="checkbox" /> 약관에 동의합니다.
        </div>

        <div className={classes["clause-content"]}></div>
        <div>
          <input type="checkbox" /> 약관에 동의합니다.
        </div>
      </div>
    </section>
  );
};

export default Clause;
