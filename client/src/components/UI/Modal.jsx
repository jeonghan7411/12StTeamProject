import React from "react";
import Card from "./Card";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.backdrop}></div>
      <Card className={`${classes.modal} ${props.className}`}>
        {props.children}
      </Card>
    </React.Fragment>
  );
};

export default Modal;
