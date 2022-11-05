import React from "react";

import classes from "./BestTag.module.css";

const BestTag = (props) => {
  return (
    <React.Fragment>
      {props.top ? (
        <div className={`${classes.BestTag} ${classes.BestTagTop}`}>
          {props.ranking}
        </div>
      ) : (
        <div className={classes.BestTag}>{props.ranking}</div>
      )}
    </React.Fragment>
  );
};

export default BestTag;
