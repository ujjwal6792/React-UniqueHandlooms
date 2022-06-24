import firebase from "../components/firebase";
import React from 'react'
import { useState, useEffect } from "react";
import IndianAttire from "./IndianAttire";


function HomepageRouting() {
    const [products, setProducts] = useState([]);
    const [lastProducts, setlastProducts] = useState();

    const productRef = firebase
    .firestore()
    .collection("Products")
    .where("Type", "==", "IndianAttire")

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

  return (
    <div>
        {console.log(products)}
        <IndianAttire products = {products}/>
    </div>
  )
}

export default HomepageRouting