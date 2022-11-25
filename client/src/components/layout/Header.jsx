import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

import { TbTruckDelivery } from "react-icons/tb";
import { RiShoppingCart2Line } from "react-icons/ri";

import classes from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderCartegory from "./HeaderCartegory";
import axios from "axios";

import logo from "../../assets/icons/siba.png";

const Header = () => {
  const location = useLocation();
  const [ishShownCartegory, setIsShowncategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handlesearchSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/search/api/getData?keyword=" + searchValue)
      .then((response) => {
        navigate("/searchResult?keyword=" + searchValue, {
          state: { result: response.data },
        });
      });
  };
  // console.log(searchValue);
  if (location.pathname === "/admin") {
    return null;
  }

  return (
    <React.Fragment>
      {ishShownCartegory && (
        <HeaderCartegory
          onHide={() => {
            setIsShowncategory(false);
          }}
        />
      )}

      <header className={classes.header}>
        <div className={classes["header-wrap-left"]}>
          <div className={classes["header-logo"]} onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
            <p className={classes["header-logo__name"]}>12st</p>
          </div>
        </div>

        <form
          onSubmit={handlesearchSubmit}
          className={classes["header-wrap-center"]}
        >
          <div>
            <span>통합검색</span>
          </div>
          <div className={classes["header-search-input"]}>
            <input
              type="text"
              defaultValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div>
            <button className={classes["header-search-btn"]} type="submit">
              <FaSearch />
            </button>
          </div>
        </form>

        <div className={classes["header-wrap-right"]}>
          {/* <MdOutlineNaturePeople className={classes["header-control"]} /> */}

          <TbTruckDelivery
            className={classes["header-control"]}
            onClick={() => navigate("/mypage")}
          />

          <RiShoppingCart2Line
            onClick={() => navigate("/cart")}
            className={classes["header-control"]}
          />
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
