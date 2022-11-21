import { Reset } from "styled-reset";
import classes from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Regist from "./components/pages/regist/Regist";
import MyPage from "./components/pages/myPage/MyPage";
import OrderList from "./components/pages/myPage/OrderList";
import CrlList from "./components/pages/myPage/CrlList";
import ProductsBest from "./components/pages/productBest/ProductsBest";
import ProductsCategory from "./components/pages/productsCategory/ProductsCategory";
import MyPointCheck from "./components/pages/myPage/MyPointCheck";
import MyPageInquiry from "./components/pages/myPage/MyPageInquiry";
import MyPageInquiryList from "./components/pages/myPage/MyPageInquiryList";
import MyPageUpdateUser from "./components/pages/myPage/MyPageUpdateUser";
import ProductCart from "./components/pages/productCart/ProductCart";
import MyPageAddress from "./components/pages/myPage/MyPageAddress";
import Order from "./components/pages/order/Order";
import OrderComplete from "./components/pages/order/OrderComplete";
import CrlWrite from "./components/pages/myPage/CrlWrite";
import Product from "./components/pages/productDetail/Product";
import OrderDetail from "./components/pages/myPage/OrderDetail";
import MyPageUserDelete from "./components/pages/myPage/MyPageUserDelete";
import React from "react";
import ReviewWrite from "./components/pages/myPage/ReviewWrite";
import AdminHome from "./components/pages/admin/AdminHome";
import SearchResult from "./components/pages/search/SearchResult";

function App() {
  const [userToken, setUserToken] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/product/api/get/products")
        .then((response) => {
          setData(response.data.result);
        });
    };

    fetchData();
  }, []);

  return (
    <div className={classes.App}>
      <Reset />
      <Router>
        <Header />
        <Nav />

        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/adminindex" element={<AdminHome />} />
            <Route
              path="/login"
              element={<Login setUserToken={setUserToken} />}
            />

            <Route path="/regist" element={<Regist />} />
            <Route path="/updateuser" element={<MyPageUpdateUser />} />
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<OrderList />} />
              <Route
                path="cancel-return-exchange-write"
                element={<CrlWrite />}
              />
              <Route path="reviewwrite" element={<ReviewWrite />} />
              <Route path="cancel-return-exchange" element={<CrlList />} />
              <Route path="mypointcheck" element={<MyPointCheck />} />
              <Route path="mypageinquiry" element={<MyPageInquiry />} />
              <Route path="mypageinquirylist" element={<MyPageInquiryList />} />
              <Route path="mypageaddress" element={<MyPageAddress />} />
              <Route path="orderdetail" element={<OrderDetail />} />
              <Route path="deleteuser" element={<MyPageUserDelete />} />
            </Route>
            <Route path="/products/:getIdx" element={<Product />} />
            <Route path="/productsBest" element={<ProductsBest />} />
            <Route path="/categories" element={<ProductsCategory />} />
            <Route path="/cart" element={<ProductCart />} />

            {/* 결제 */}
            <Route path="/order" element={<Order />} />
            <Route path="/orderComplete" element={<OrderComplete />} />
            <Route path="/searchResult" element={<SearchResult />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
