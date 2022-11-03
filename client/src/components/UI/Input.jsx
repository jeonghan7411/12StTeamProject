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
    <input
      className={className}
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

Input.defalutProps = {
  type: "text",
  isValid: "true",
};

export default Input;
