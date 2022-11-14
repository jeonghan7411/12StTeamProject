import React from "react";

const MyPageInput = ({ type, name, value, onChange, onClick, placeholder }) => {
  return (
    <React.Fragment>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default MyPageInput;
