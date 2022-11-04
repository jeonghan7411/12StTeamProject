import React from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";

import classes from "./Regist.module.css";

const Regist = () => {
  return (
    <Card className={classes.regist}>
      <div className={classes["regist-input"]}>
        <label htm></label>
        <Input />
        <div></div>
      </div>
      <div className={classes["regist-input"]}>
        <Input />
      </div>
      <div className={classes["regist-input"]}>
        <Input />
      </div>
      <div className={classes["regist-input"]}>
        <Input />
      </div>
      <div className={classes["regist-input"]}>
        <Input />
      </div>
      <div className={classes["regist-input"]}>
        <Input />
      </div>
    </Card>
  );
};

export default Regist;
