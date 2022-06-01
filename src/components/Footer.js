import React from "react";
import "../style/Footer.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function Footer() {
  return (
    <footer>
      {/* mobile */}
      <div className="footer">
        <Link to="/" className="footerItems ">
          <HomeRoundedIcon />
        </Link>
        <Link to="/allproducts" className="footerItems ">
          <CategoryRoundedIcon />
        </Link>
        <Link to="/account" className="footerItems ">
          <AccountCircleRoundedIcon />
        </Link>
        <Link to="/checkout" className="footerItems ">
          <Basket />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
