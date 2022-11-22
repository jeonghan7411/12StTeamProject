import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UserViewModal.module.css";

const UserViewModal = ({ props, onClose }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className={classes.DetailModal} onClick={onClose}></div>
      <div className={classes["modal-container"]}>{props.dName}</div>
    </React.Fragment>
  );
};

export default UserViewModal;
