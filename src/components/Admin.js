import Product from "./Product";
import "../style/Admin.css";
import { useState,useEffect } from "react";
import {db} from "./firebase"
import { collection,getDocs, addDoc } from "firebase/firestore"

function Admin() {
// upload to database
const [uploadname, setUploadname] = useState("");
const [uploadsize, setUploadsize] = useState("");
const [uploadprice, setUploadprice] = useState(0);
const [uploadimage, setUploadimage] = useState("");

const productCollectionRef = collection(db, "Products")

const upload = async ()=> {
    await addDoc(productCollectionRef, {Name: uploadname, Size: uploadsize, Price: uploadprice, Img: uploadimage})
    console.log(uploadimage, uploadname, uploadprice, uploadsize)
}
// 
const [products, setProducts] = useState([]);
useEffect(() => {
  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  getProducts();
}, []);

  return (
      <main>
        <div className="addProducts">
        
              <input placeholder="Name" type="text" onChange={(event) => {setUploadname(event.target.value)}}/>
              <input placeholder="Size" type="text" onChange={(event) => {setUploadsize(event.target.value)}} />
              <input placeholder="Price" type="number" onChange={(event) => {setUploadprice(event.target.value)}} />
              <input placeholder="Image" type="text" onChange={(event) => {setUploadimage(event.target.value)}} />
              <button onClick={upload}>Upload</button>
        </div>
        <div className="dbDisplay">
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
      </main>

    )
  }

export default Admin;
