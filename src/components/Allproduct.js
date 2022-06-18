import React from "react";
import { Link } from "react-router-dom";
import "../style/Allproduct.css";
import Product from "./Product";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import Basket from "./Basket";
import Logo from "../images/Logo.avif";

function Allproduct() {
  const [products, setProducts] = useState([]);
  const [lastProducts, setlastProducts] = useState();
  const productRef = firebase
    .firestore()
    .collection("Products")
    .orderBy("Name", "asc");

  useEffect(() => {
    productRef
      .limit(12)
      .get()
      .then((collections) => {
        setProducts(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setlastProducts(collections.docs[collections.docs.length-1]);
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
      productRef.endBefore(lastProducts).limitToLast(12)
      .get()
      .then((collections) => {
        setProducts(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  };

  if (products.length === 0) {
    return <div className="loaderContainer">
      <div className="loader"></div>
    </div>;
  }
  return (
    <div className="home">
      <div className="home__container">
        <div className="topBar">
          <Link to="/">
            <img className="topImage" src={Logo} alt="" />
          </Link>
          <h2>New Collections</h2>
          <Link to="/checkout" className="allProductsBasket">
            <Basket />
          </Link>
        </div>
        <div className="productRow">
          {products.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.Name}
              price={item.Price}
              rating={5}
              image={item.Img}
              size={item.Size}
            />
          ))}
        </div>
        <div className="paginate">
          <button className="paginateButton" onClick={fetchBack}>back</button>
          <button className="paginateButton" onClick={fetchMore}>more</button>
        </div>
      </div>
    </div>
  );
}

export default Allproduct;
