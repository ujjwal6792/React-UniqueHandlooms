import Product from "./Product";
import "../style/Home.css";
import { useState, useEffect } from "react";
import {db} from "./firebase"
import { collection, getDocs } from "firebase/firestore"


function Home() {

const [products, setProducts] = useState([]);
const productCollectionRef = collection(db, "Products")
useEffect(()=>{
    const getProducts = async ()=>{
        const data = await getDocs(productCollectionRef);
        setProducts(data.docs.map((doc)=> ({...doc.data(), id: doc.id}))) 

    }
    getProducts()

}, [])

  return (
(products.map((item)=>(
<Product
            id={item.id}
            title={item.Name}
            price={item.Price}
            rating={5}
            image=""
            size={item.Size}
          />

))));
}

export default Home;
