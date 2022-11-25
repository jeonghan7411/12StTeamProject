import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Reset } from "styled-reset";
import classes from "./App.module.css";
import axios from "axios";

import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Regist from "./components/pages/regist/Regist";
import MyPage from "./components/pages/myPage/MyPage";
import OrderList from "./components/pages/myPage/OrderList";
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
import ReviewWrite from "./components/pages/myPage/ReviewWrite";
import SearchResult from "./components/pages/search/SearchResult";
import ReviewList from "./components/pages/myPage/ReviewList";
import Admin from "./components/pages/admin/Admin";
import Error404 from "./components/pages/nonPage/Error404";
import Loading from "./components/pages/loading/Loading";

function App() {
  const [data, setData] = useState([]);
  const [bestProduct, setBestProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/product/api/get/products")
        .then((response) => {
          setData(response.data.result[0]);
          setBestProduct(response.data.result[1]);
          setIsLoading(true);
        });
    };
    fetchData();
  }, []);
  if (!isLoading) {
    return <Loading />;
  }
  return (
    <div className={classes.App}>
      <Reset />
      <Router>
        <>
          <Header />
          <Nav />

          <main className={classes.main}>
            <Routes>
              <Route>
                {/* element={<AdminHome />} */}
                {/* <Admin /> */}
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="/"
                  element={<Home data={data} bestProduct={bestProduct} />}
                />
                <Route path="/login" element={<Login />} />

                <Route path="/regist" element={<Regist />} />
                <Route path="/updateuser" element={<MyPageUpdateUser />} />
                <Route path="/mypage" element={<MyPage />}>
                  <Route index element={<OrderList />} />
                  <Route
                    path="cancel-return-exchange-write"
                    element={<CrlWrite />}
                  />
                  <Route path="reviewwrite" element={<ReviewWrite />} />
                  <Route path="reviewlist" element={<ReviewList />} />

                  <Route path="mypointcheck" element={<MyPointCheck />} />
                  <Route path="mypageinquiry" element={<MyPageInquiry />} />
                  <Route
                    path="mypageinquirylist"
                    element={<MyPageInquiryList />}
                  />
                  <Route path="mypageaddress" element={<MyPageAddress />} />
                  <Route path="orderdetail" element={<OrderDetail />} />
                  <Route path="deleteuser" element={<MyPageUserDelete />} />
                </Route>
                <Route path="/products/:getIdx" element={<Product />} />
                <Route
                  path="/productsBest"
                  element={<ProductsBest bestProduct={bestProduct} />}
                />
                <Route path="/categories" element={<ProductsCategory />} />
                <Route path="/cart" element={<ProductCart />} />

                {/* 결제 */}
                <Route path="/order" element={<Order />} />
                <Route path="/orderComplete" element={<OrderComplete />} />
                <Route path="/searchResult" element={<SearchResult />} />
                <Route path="/*" element={<Error404 />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </>
      </Router>
    </div>
  );
}

export default App;
