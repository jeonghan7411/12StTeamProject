import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./UserViewModal.module.css";

const UserViewModal = ({ props, onClose }) => {
  const navigate = useNavigate();
  const {
    idx,
    uId,
    uName,
    uBirth,
    uPhone,
    uZipcode,
    uAddress,
    uAdditionalAddr,
    uRegdate,
    uMile,
    uEmail,
  } = props[0];

  return (
    <React.Fragment>
      <div className={classes.DetailModal} onClick={onClose}></div>
      <div className={classes["modal-container"]}>
        <div>
          <h2>사용자 정보</h2>
        </div>

        <div>
          <label>회원번호 :</label>
          <div>{idx}</div>
        </div>

        <div>
          <label>아이디 :</label>
          <div>{uId}</div>
        </div>

        <div>
          <label>이름 :</label>
          <div>{uName}</div>
        </div>

        <div>
          <label>생년월일 :</label>
          <div>{uBirth}</div>
        </div>

        <div>
          <label>전화번호 :</label>
          <div>{uPhone}</div>
        </div>

        <div>
          <label>Email :</label>
          <div>{uEmail}</div>
        </div>

        <div>
          <label>마일리지 :</label>
          <div>{uMile}</div>
        </div>

        <div>
          <label>주소 :</label>
          <div>{`우편번호 [${uZipcode}]`}</div>
          <div>{` ${uAddress} ${uAdditionalAddr}`}</div>
        </div>

        <div>
          <label>가입날짜 :</label>
          <div>{uRegdate}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserViewModal;
