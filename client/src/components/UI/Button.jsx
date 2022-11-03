import React from "react";

import classes from "./Button.module.css";

const Button = ({ text, onClick, className, padding, type }) => {
  return (
    <button
      type={type}
      style={{ padding: `${padding}` }}
      className={`${classes["button"]} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defalutProps = {
  type: "button",
};

export default Button;
