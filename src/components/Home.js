import React from "react";
import "../style/Home.css";
import Hero from "../images/Hero.avif";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="allProducts">
      {/* <div className="topLayout">
        <p>Starting at &#8377; 249</p>
      </div> */}
        <div className="hero">
          <img className="heroImage" src={Hero} alt="" />
          <div className="heroText">
            <h2>20% Discount</h2>
            <p>On your first purchase</p>
          </div>
        </div>

        <div className="productTopBar">
          <h2>Our Collection</h2>
          <h2 className="cursorPointer">filters</h2>
        </div>

      <div className="productContainer">

        <div className="productList">
        </div>
      </div>
          <Link to="/allproducts" className="allProductsButton">
            <button>All Products</button>
          </Link>
    </div>
  );
}

export default Home;
