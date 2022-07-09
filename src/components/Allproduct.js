import React from "react";
import { Link } from "react-router-dom";
import "../style/Allproduct.css";
import Product from "./Product";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import Basket from "./Basket";
import Logo from "../images/Logo.avif";
import IndianAttire from "../pages/IndianAttire";
import Bedsheets from "../pages/Bedsheets";
import Carpets from "../pages/Carpetsandmats";
import Cushions from "../pages/Cushions";
import Mattress from "../pages/Mattress";
import Towels from "../pages/Towels";
import { FiChevronDown } from "react-icons/fi";

function Allproduct() {
  const [filterCat, setFilterCat] = useState("Our Collection");
  const [displayFilters, setDisplayFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [lastProducts, setlastProducts] = useState();
  const productRef = firebase.firestore().collection("products");

  useEffect(() => {
    productRef
      .limit(12)
      .get()
      .then((collections) => {
        setProducts(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setlastProducts(collections.docs[collections.docs.length - 1]);
      });
  }, []);

  const fetchMore = () => {
    productRef
      .startAfter(lastProducts)
      .limit(12)
      .get()
      .then((collections) => {
        setProducts(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  };

  const fetchBack = () => {
    productRef
      .endBefore(lastProducts)
      .limitToLast(12)
      .get()
      .then((collections) => {
        setProducts(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  };

  if (products.length === 0) {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="home">
      <div className="home__container">
        <div className="topBar">
          <Link to="/">
            <img className="topImage" src={Logo} alt="" />
          </Link>
          <div
            className="center"
            onClick={() => setDisplayFilters(!displayFilters)}
          >
            <h2>{filterCat}</h2>
            <FiChevronDown className="centerArrow" />
            {displayFilters && (
              <div className="dropFilters">
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Our Collection
                </label>
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Indian Apparel
                </label>
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Carpets
                </label>
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Bedsheets
                </label>
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Mattress
                </label>{" "}
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Towels
                </label>{" "}
                <label
                  onClick={(e) => {
                    setFilterCat(e.target.innerText);
                  }}
                >
                  Cushions
                </label>
              </div>
            )}
          </div>
          <Link to="/checkout" className="allProductsBasket">
            <Basket />
          </Link>
        </div>
        {filterCat == "Our Collection" && (
          <>
            <div className="productRow">
              {products.map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.img}
                  size={item.size}
                />
              ))}
            </div>

            <div className="paginate">
              <button className="paginateButton" onClick={fetchBack}>
                back
              </button>
              <button className="paginateButton" onClick={fetchMore}>
                more
              </button>
            </div>
          </>
        )}
        {filterCat == "Indian Apparel" && <IndianAttire />}
        {filterCat == "Bedsheets" && <Bedsheets />}
        {filterCat == "Carpets" && <Carpets />}
        {filterCat == "Towels" && <Towels />}
        {filterCat == "Mattress" && <Mattress />}
        {filterCat == "Cushions" && <Cushions />}
      </div>
    </div>
  );
}

export default Allproduct;
