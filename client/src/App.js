import { Reset } from "styled-reset";
import classes from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Regist from "./components/pages/regist/Regist";
import MyPage from "./components/pages/myPage/MyPage";
import Product from "./components/pages/ProductDetail/Product";
import OrderList from "./components/pages/myPage/OrderList";
import CrlList from "./components/pages/myPage/CrlList";
import ProductsBest from "./components/pages/productBest/ProductsBest";
import ProductsCategory from "./components/pages/productsCategory/ProductsCategory";
import MyPointCheck from "./components/pages/myPage/MyPointCheck";
import MyPageInquiry from "./components/pages/myPage/MyPageInquiry";
import ProductCart from "./components/pages/productCart/ProductCart";

function App() {
  return (
    <div className={classes.App}>
      <Reset />
      <Router>
        <Header />
        <Nav />

        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<OrderList />} />
              <Route path="cancel-return-exchange" element={<CrlList />} />
              <Route path="mypointcheck" element={<MyPointCheck />} />
              <Route path="mypageinquiry" element={<MyPageInquiry />} />
            </Route>
            <Route path="/products/:getIdx" element={<Product />} />
            <Route path="/productsBest" element={<ProductsBest />} />
            <Route path="/productsCategory" element={<ProductsCategory />} />
            <Route path="/cart" element={<ProductCart />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
