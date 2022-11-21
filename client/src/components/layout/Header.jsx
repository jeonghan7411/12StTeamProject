import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { MdOutlineNaturePeople } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { RiShoppingCart2Line } from "react-icons/ri";
import { ImEyePlus } from "react-icons/im";

import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import HeaderCartegory from "./HeaderCartegory";
import axios from "axios";

const Header = () => {
  const [ishShownCartegory, setIsShowncategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  console.log(searchValue);

  const handlesearchSubmit = async (e) => {
    e.preventDefault();

    await axios.post();
  };

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
          <span onClick={() => setIsShowncategory(true)}>클릭</span>
          <h1 onClick={() => navigate("/")}>12st</h1>
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
          <MdOutlineNaturePeople className={classes["header-control"]} />

          <TbTruckDelivery className={classes["header-control"]} />

          <RiShoppingCart2Line
            onClick={() => navigate("/cart")}
            className={classes["header-control"]}
          />
          <ImEyePlus className={classes["header-control"]} />
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
