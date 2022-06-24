import React, { useState } from "react";
import "../style/Header.css";
import { Link  } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Logo from "../images/Logo.avif";
import Basket from "./Basket";

function Header() {
  const [{ user, userDetailsContext }] = useStateValue();
  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className="navbar">
        <Link to="/" onClick={closeMobileMenu}>
          <img className="header__logo" src={Logo} alt="logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item ">
            <Link
              to=""
              className="nav-links nav-back "
              onClick={closeMobileMenu}
            >
              Back
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links mob1" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/allproducts"
              className="nav-links mob2"
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={user ? "/account" : !user && "/login"}
              className="nav-links username"
              onClick={closeMobileMenu}
            >
              Hello
              {!user
                ? ` Guest`
                : userDetailsContext == null
                ? ` Loading`
                : userDetailsContext == undefined
                ? ` Loading`
                : ` ${userDetailsContext[0]?.firstname}`}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={!user && "/login"}
              className="nav-links userauth"
              onClick={handleAuthenticaton}
            >
              {user ? "Sign out" : "Sign up" }
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/checkout"
              className="nav-links header__optionBasket "
              onClick={closeMobileMenu}
            >
              <Basket />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
