import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import adminlogo from "../../../assets/icons/setting.png";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import AdminOrder from "./AdminOrder";
import SubOrder from "./SubOrder";
import SubUser from "./SubUser";
import AdminUser from "./AdminUser";
import { AiOutlineUserSwitch } from "react-icons/ai";
import {
  MdOutlineDomainVerification,
  MdDesignServices,
  MdEventAvailable,
} from "react-icons/md";
import { FaProductHunt, FaShoppingBasket, FaClipboard } from "react-icons/fa";

import { BiMobileAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
// import { AiOutlineUserSwitch } from "react-icons/ai";
import AdminProducts from "./AdminProducts";
import SubProducts from "./SubProducts";
import classes from "./Admin.module.css";
import AdminBoard from "./AdminBoard";
import SubBoard from "./SubBoard";

const Admin = () => {
  const navigate = useNavigate();
  const [main, setMain] = useState(true);
  const [product, setProduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [userinfo, setUserinfo] = useState(false);
  const [board, setBoard] = useState(false);
  const [design, setDesign] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [setting, setSetting] = useState(false);

  const [category, setCategody] = useState({
    main: false,
    product: false,
    userinfo: false,
    board: false,
    order: false,
  });

  const [userList, setUserList] = useState([]);
  const [detailUser, setDetailUser] = useState({});

  const [showDetail, setShowDetail] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [detailOrder, setDetailOrder] = useState({});
  const [productList, setProductList] = useState([]);
  const [detailProduct, setDetailProduct] = useState({});
  const [detailBoard, setDetailBoard] = useState({});
  const [reset, setReset] = useState(false);
  const navInfo = [
    {
      title: "메인",
      onClick: () => {
        setMain(true);
        setProduct(false);
        setOrder(false);
        setUserinfo(false);
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
        setUserinfo(false);
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
        setUserinfo(false);
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
        setUserinfo(true);
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
        setUserinfo(false);
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
        setUserinfo(false);
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
        setUserinfo(false);
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
        setUserinfo(false);
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
        setUserinfo(false);
        setBoard(false);
        setDesign(false);
        setMobile(false);
        setPromotion(false);
        setSetting(true);
      },
    },
  ];

  useEffect(() => {
    const userData = async () => {
      await axios
        .get("http://localhost:5000/admin/api/userlist")
        .then((response) => {
          if (response.data.status === 200) {
            setUserList(response.data.result);
          }
        });

      await axios
        .get("http://localhost:5000/admin/api/get/orderList")
        .then((response) => {
          setOrderList(response.data);
        });

      await axios
        .get("http://localhost:5000/admin/api/get/productList")
        .then((response) => {
          setProductList(response.data);
        });
        
       await axios.get("http://localhost:5000/admin/api/boardList")
        .then((response) => {
          setBoardList(response.data);
        });
    };
    userData();
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overlflow:auto`);
  }, [reset]);

  const [user, setUser] = useState({});
  const location = useLocation();
  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);
  // console.log(location);
  if (location.state === null || location.state.user.uAuth !== 2) {
    alert("관리자가 아닙니다");
    window.location.href = "/";
    return null;
  }

  return (
    <Fragment>
      <div className={classes.backDrop}></div>
      <div className={classes.admin}>
        <nav className={classes["admin-nav"]}>
          <div className={classes["admin-nav-logo"]}>
            <img
              className={classes["admin-nav-logo__img"]}
              src={adminlogo}
              alt="어드민 로고"
            />
            12st Admin
          </div>

          <div className={classes["admin-nav-list"]}>
            <div
              className={classes["admin-nav-list__item"]}
              onClick={() =>
                setCategody({
                  main: true,
                  product: false,
                  userinfo: false,
                  board: false,
                  order: false,
                })
              }
            >
              <MdOutlineDomainVerification
                className={classes["admin-nav-list__icon"]}
              />
              메인
            </div>
            <div
              className={classes["admin-nav-list__item"]}
              onClick={() =>
                setCategody({
                  main: false,
                  product: true,
                  userinfo: false,
                  board: false,
                  order: false,
                })
              }
            >
              <FaProductHunt className={classes["admin-nav-list__icon"]} />
              상품관리
            </div>
            <div
              className={classes["admin-nav-list__item"]}
              onClick={() =>
                setCategody({
                  main: false,
                  product: false,
                  userinfo: false,
                  board: false,
                  order: true,
                })
              }
            >
              <FaShoppingBasket className={classes["admin-nav-list__icon"]} />
              주문관리
            </div>
            <div
              className={classes["admin-nav-list__item"]}
              onClick={() =>
                setCategody({
                  main: false,
                  product: false,
                  userinfo: true,
                  board: false,
                  order: false,
                })
              }
            >
              <AiOutlineUserSwitch
                className={classes["admin-nav-list__icon"]}
              />
              고객관리
            </div>
            <div
              className={classes["admin-nav-list__item"]}
              onClick={() =>
                setCategody({
                  main: false,
                  product: false,
                  userinfo: false,
                  board: true,
                  order: false,
                })
              }
            >
              <FaClipboard className={classes["admin-nav-list__icon"]} />
              게시판관리
            </div>
            <div className={classes["admin-nav-list__item"]}>
              <MdDesignServices className={classes["admin-nav-list__icon"]} />
              디자인관리
            </div>
            <div className={classes["admin-nav-list__item"]}>
              <BiMobileAlt />
              모바일쇼핑몰
            </div>
            <div className={classes["admin-nav-list__item"]}>
              <MdEventAvailable className={classes["admin-nav-list__icon"]} />
              프로모션
            </div>
            <div className={classes["admin-nav-list__item"]}>
              <IoMdSettings className={classes["admin-nav-list__icon"]} />
              쇼핑몰 설정
            </div>
          </div>
        </nav>

        {category.order && (
          <section className={classes["admin-section"]}>
            <AdminOrder orderList={orderList} onDetailOrder={setDetailOrder} />
            <SubOrder detailOrder={detailOrder} />
          </section>
        )}
        {category.userinfo && (
          <AdminUser userList={userList} setReset={setReset} />
        )}

        {category.product && (
          <section className={classes["admin-section"]}>
            <AdminProducts
              productList={productList}
              setReset={setReset}
              onDetailProduct={setDetailProduct}
            />
            <SubProducts
              detailProduct={detailProduct}
              onDetailProduct={setDetailProduct}
            />
          </section>
        )}
        {userinfo && (
          <section className={classes["admin-section"]}>
            <AdminUser
              userList={userList}
              setReset={setReset}
              setDetailUser={setDetailUser}
              showDetail={showDetail}
              setShowDetail={setShowDetail}
            />
            <SubUser
              detailUser={detailUser}
              showDetail={showDetail}
              setShowDetail={setShowDetail}
            />
          </section>
        )}
        {/* {board && <AdminBoard />}
        {design && <AdminDesign />}
        {userinfo && <AdminUser userList={userList} setReset={setReset} />}
        {board && (
          <section className={classes["admin-section"]}>
            <AdminBoard
              boardList={boardList}
              setReset={setReset}
              onDetailBoard={setDetailBoard}
            />
            <SubBoard detailBoard={detailBoard} />
          </section>
        )}
        {/* {design && <AdminDesign />}
        {mobile && <AdminMobile />}
        {promotion && <AdminPromotion />}
        {setting && <AdminSetting />} */}
      </div>
    </Fragment>
  );
};

export default Admin;
