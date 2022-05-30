import React from "react";
import "../style/Allproduct.css";
import Product from "./Product";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

import Hero from "../images/Hero.png";

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
        <img className="home__image" src={Hero} alt="" />
        {/* <div className="productTopBar">
          <h2>New Collections</h2>
          <h2 className="cursorPointer">filters</h2>
        </div> */}
        <div className="home__row">
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
