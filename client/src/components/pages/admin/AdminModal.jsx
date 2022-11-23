import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminMain from "./AdminMain";
import AdminProduct from "./AdminProduct";
import AdminOrder from "./AdminOrder";
import AdminUser from "./AdminUser";
import AdminBoard from "./AdminBoard";
import AdminDesign from "./AdminDesign";
import AdminMobile from "./AdminMobile";
import AdminPromotion from "./AdminPromotion";
import AdminSetting from "./AdminSetting";

import classes from "./AdminModal.module.css";
import { useEffect } from "react";
import axios from "axios";

const AdminModal = ({ check }) => {
  const navigate = useNavigate();
  const [main, setMain] = useState(true);
  const [product, setProduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [user, setUser] = useState(false);
  const [board, setBoard] = useState(false);
  const [design, setDesign] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [setting, setSetting] = useState(false);

  const navInfo = [
    {
      title: "메인",
      onClick: () => {
        setMain(true);
        setProduct(false);
        setOrder(false);
        setUser(false);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "상품관리",
      onClick: () => {
        setMain(false);
        setProduct(true);
        setOrder(false);
        setUser(false);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "주문관리",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(true);
        setUser(false);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "고객관리",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(false);
        setUser(true);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "게시판관리",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(false);
        setUser(false);
        setBoard(true);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "디자인관리",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(false);
        setUser(false);
        setBoard(false);
        setDesign(true);
        setMobile(false);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "모바일쇼핑몰",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(false);
        setUser(false);
        setBoard(false);
        setDesign(false);
        setMobile(true);
        setPromotion(false);
        setSetting(false);
      },
    },
    {
      title: "프로모션",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(false);
        setUser(false);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(true);
        setSetting(false);
      },
    },
    {
      title: "쇼핑몰 설정",
      onClick: () => {
        setMain(false);
        setProduct(false);
        setOrder(false);
        setUser(false);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(true);
      },
    },
  ];

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const userData = async () => {
      await axios
        .get("http://localhost:5000/admin/api/userlist")
        .then((response) => {
          if (response.data.status === 200) {
            setUserList(response.data.result);
          }
        });
    };
    userData();
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overlflow:auto`);
  }, []);

  return (
    <React.Fragment>
      <div className={classes.AdminModal}></div>
      <div className={classes["modal-container"]}>
        <div className={classes["admin-nav-wrap"]}>
          {navInfo.map((it, key) => {
            return (
              <button key={key} onClick={it.onClick}>
                {it.title}
              </button>
            );
          })}
        </div>
        {main && <AdminMain />}
        {product && <AdminProduct />}
        {order && <AdminOrder />}
        {user && <AdminUser userList={userList} />}
        {board && <AdminBoard />}
        {design && <AdminDesign />}
        {mobile && <AdminMobile />}
        {promotion && <AdminPromotion />}
        {setting && <AdminSetting />}
      </div>
    </React.Fragment>
  );
};

export default AdminModal;
