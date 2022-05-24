import React, { useState } from "react";
import "../style/Footer.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Footer() {
  const [{ basket, user }] = useStateValue();

  return (
    <footer>
        <div className="footer">
              
              <Link to="/" className="nav-links footerBasket ">
              <HomeRoundedIcon/>
              </Link>
              <Link to="/category" className="nav-links footerBasket ">
              <CategoryRoundedIcon/>
              </Link>
              <Link to="/account" className="nav-links footerBasket ">
                 <AccountCircleRoundedIcon/>
              </Link>
              <Link to="/checkout" className="nav-links footerBasket ">
                <LocalGroceryStoreRoundedIcon/>
                <span className=" footerBasketCount">{basket?.length}</span>
              </Link>
        </div>
    </footer>
  );
}

export default Footer;
