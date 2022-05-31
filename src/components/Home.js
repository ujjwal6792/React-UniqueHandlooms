import React from "react";
import "../style/Home.css";
import Hero from "../images/Hero.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="allProducts">
      {/* <div className="topLayout">
        <p>Starting at &#8377; 249</p>
      </div> */}
      <div className="productContainer">
        <img className="home__image" src={Hero} alt="" />
        <div className="productTopBar">
          <h2>New Collections</h2>
          <h2 className="cursorPointer">filters</h2>
        </div>

        <div className="productList">
          <Link to="/allproducts" className="">
            <button>All Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
