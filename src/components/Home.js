import React from "react";
import "../style/Home.css";
import Product from "./Product";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

import Hero from "../images/Hero.png";

function Home() {
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
        <div className="productTopBar">
          <h2>New Collections</h2>
          <h2 className="cursorPointer">filters</h2>
        </div>
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
          {/* <Product
            id="12321341"
            title="Green Suit with Pants and Chunni"
            price={1200}
            rating={5}
            image={Product1}
            size={`M`}
          />
          <Product
            id="49538094"
            title="Yellow Cotton Kurti "
            price={650}
            rating={4}
            image={Product2}
            size={`40`}
          />

          <Product
            id="4903850"
            title="Cyan Kurti with Umbrella Cut Arms "
            price={1050}
            rating={5}
            image={Product3}
            size={`46`}
          />
          <Product
            id="23445930"
            title="Orange White Print Design "
            price={650}
            rating={5}
            image={Product4}
            size={`40,42`}
          />
          <Product
            id="3254354345"
            title="Dual Tone Red-White Kurti Lotus "
            price={700}
            rating={4}
            image={Product5}
            size={`44`}
          />

          <Product
            id="90829332"
            title="Sea Green Kurti with Digital Print "
            price={700}
            rating={4}
            image={Product6}
            size={`40`}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
