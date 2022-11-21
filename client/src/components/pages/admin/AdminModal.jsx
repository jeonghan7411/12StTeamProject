import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AdminModal.module.css";

const DetailModal = ({ props, onClose }) => {
  const navigate = useNavigate();
  const navInfo = [
    {
      title: "메인",
      onClick: "",
    },
    {
      title: "상품관리",
      onClick: "",
    },
    {
      title: "주문관리",
      onClick: "",
    },
    {
      title: "고객관리",
      onClick: "",
    },
  ];
  return (
    <React.Fragment>
      <div className={classes.DetailModal} onClick={onClose}></div>
      <div className={classes["modal-container"]}>
        <div>
          {navInfo.map((it) => {
            return <button onClick={it.onClick}>{it.title}</button>;
          })}
        </div>
        <div>컨텐츠</div>
      </div>
    </React.Fragment>
  );
};

export default DetailModal;
