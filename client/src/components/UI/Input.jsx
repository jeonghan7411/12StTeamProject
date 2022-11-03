import React from "react";

import classes from "./Input.module.css";

const Input = ({
  type,
  id,
  value,
  onChange,
  onBlur,
  isValid,
  className,
  placeholder,
}) => {
  return (
    <div
      className={`${classes.input} ${className} ${
        !isValid ? classes.invalid : ""
      }`}
    >
      <input
        className={className}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.defalutProps = {
  type: "text",
  isValid: "true",
};

export default Input;
