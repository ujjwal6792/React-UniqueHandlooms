import React from "react";
import {Link} from "react-router-dom"
import "../style/Allproduct.css";
import Product from "./Product";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Basket from "./Basket";

import Logo from "../images/Logo.png";

function Allproduct() {
  const [products, setProducts] = useState([]);
  const productCollectionRef = collection(db, "Products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);
  return (
    <div className="home">
      <div className="home__container">
        <div className="topBar">
        <Link to="/"><img className="topImage" src={Logo} alt="" /></Link>
          <h2>New Collections</h2>
          <Link to="/checkout"
          className="allProductsBasket">
            <Basket />
          </Link>
        </div>
        <div className="productRow">
         { (products.map((item)=>(
          <Product key={item.id}
            id={item.id}
            title={item.Name}
            price={item.Price}
            rating={5}
            image={item.Img}
            size={item.Size}
          />
          )))
         }
         
        </div>
      </div>
    </div>
  );
}

export default Allproduct;
