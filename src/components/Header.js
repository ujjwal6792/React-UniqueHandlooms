import React, { useState } from "react";
import "../style/Header.css";
import SearchIcon from "@mui/icons-material/Search";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Logo from "../images/Logo.avif";
import Basket from "./Basket";

function Header() {
  const [{ basket, user }] = useStateValue();
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
            <li className="nav-item X">
                <Link to="" className="nav-links x" onClick={closeMobileMenu}>
                  X
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-links mob1" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-links mob2"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
              <Link
                to={!user && "/login"}
                className="nav-links username"
                onClick={closeMobileMenu}
              >
                Hello
                {!user ? ` Guest` : ` ${user.email}`}
              </Link>
              </li>
            <li className="nav-item"  >
              <Link
                to={!user && "/login"}
                className="nav-links userauth"
                onClick={handleAuthenticaton} 
              >
                {user ? "Sign Out" : "Sign In"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/checkout"
                className="nav-links header__optionBasket "
                onClick={closeMobileMenu}
              >
                <Basket />
                {/* <ShoppingBasketIcon />
                <span className=" header__basketCount">{basket?.length}</span> */}
              </Link>
            </li>
        </ul>
       
      </nav>
    </>
  );

  // return (
  //   <div className="header">
  //     <Link to="/" style={{ textDecoration: 'none' }}>
  //       <img
  //         className="header__logo"
  //         src={Logo} alt="logo"
  //       />
  //     </Link>

  //     <div className="header__search">
  //       <input className="header__searchInput" type="text" />
  //       <SearchIcon className="header__searchIcon" />
  //     </div>

  //     <div className="header__nav">
  //       <Link to={!user && "/login"} style={{ textDecoration: 'none' }}>
          // <div onClick={handleAuthenticaton} className="header__option">
          //   <span className="header__optionLineOne">
          //     Hello
          //     {!user ? ` Guest` : ` ${user.email}`}
          //   </span>
          //   <span className="header__optionLineTwo">
          //     {user ? "Sign Out" : "Sign In"}
          //   </span>
          // </div>
  //       </Link>

  //       <Link to="/orders" style={{ textDecoration: 'none' }}>
  //         <div className="header__option">
  //           <span className="header__optionLineOne">Returns</span>
  //           <span className="header__optionLineTwo">& Orders</span>
  //         </div>
  //       </Link>

  //       <div className="header__option">
  //         <span className="header__optionLineOne">Your</span>
  //         <span className="header__optionLineTwo">Prime</span>
  //       </div>

  //       <Link to="/checkout" style={{ textDecoration: 'none' }}>
  //         <div className="header__optionBasket">
  //           <ShoppingBasketIcon />
  //           <span className="header__optionLineTwo header__basketCount">
  //             {basket?.length}
  //           </span>
  //         </div>
  //       </Link>
  //     </div>
  //   </div>
  // );
}

export default Header;
