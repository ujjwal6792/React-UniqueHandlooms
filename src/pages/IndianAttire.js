import React from 'react'
import { useState, useEffect } from "react";
import Product from '../components/Product'
import "../style/Allproduct.css";
import firebase from "../components/firebase";


function IndianAttire() {
  const [products, setProducts] = useState([]);
  const [lastProducts, setlastProducts] = useState();

  const productRef = firebase
  .firestore()
  .collection("products")
  .where("category", "==", "indianApparel")

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
    
    <div className="pages">
        <div className="home__container">
            <div className="productRow">
                  {products?.map((item) => (
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
        </div>
        <div className="paginate">
          <button className="paginateButton" onClick={fetchBack}>back</button>
          <button className="paginateButton" onClick={fetchMore}>more</button>
        </div>  
    </div>
  )
}

export default IndianAttire