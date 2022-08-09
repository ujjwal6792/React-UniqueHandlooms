import React, { useEffect, useState } from "react";
import "./style/App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Header from "./components/Header";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import { db, auth } from "./components/firebase";
import firebase from "./components/firebase";
import {doc, getDoc} from "firebase/firestore"
import { useStateValue } from "./components/StateProvider";
import Allproduct from "./components/Allproduct";
import Account from "./components/Account";
import Register from "./components/Register";
import ConfirmWishlist from "./components/ConfirmWishlist";
import IndianAttire from "./pages/IndianAttire";
import Bedsheets from "./pages/Bedsheets";
import Carpetsandmats from "./pages/Carpetsandmats";
import Cushions from "./pages/Cushions";
import Mattress from "./pages/Mattress";
import Towels from "./pages/Towels";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [time, setTime] = useState(false);
if (user){
  setTimeout(()=> {setTime(true)}, 100)
}
useEffect(() => {
  if (user) {
 const userRef = doc(db, "users", user.uid)
  getDoc(userRef)
    .then(
      (doc)=>{
       const userDetails = {...doc.data(), id: doc.id}

          dispatch({
            type: "USER_DETAILS",
            details: {
              firstname: userDetails.firstname,
              surname: userDetails.surname,
              address: userDetails.address,
              phone: userDetails.phone,
              email: userDetails.email,
            },
          });}
    );
  }
},[time]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  const location = useLocation();

useEffect(() => {
    window.scrollTo(0, 0);
  },[location]);

  return (
        <div className="app">

          <Routes>
          <Route path="/Towels" element={[<Header/>, <Towels />, <Footer />]} />  

          <Route path="/Mattress" element={[<Header/>, <Mattress />, <Footer />]} />  
          
          <Route path="/Cushions" element={[<Header/>, <Cushions />, <Footer />]} />  

          <Route path="/CarpetsandMats" element={[<Header/>, <Carpetsandmats />, <Footer />]} />  

          <Route path="/Bedsheets" element={[<Header/>, <Bedsheets />, <Footer />]} />

          <Route path="/IndianAttire" element={[<Header/>, <IndianAttire />, <Footer />]} />

          <Route path="/confirmwishlist" element={[<Header/>, <ConfirmWishlist />, <Footer />]} />
            
            <Route path="/register" element={[<Register />, <Footer />]} />

            <Route path="/account" element={[<Header/>, <Account />, <Footer />]} />

            <Route path="/allproducts" element={[<Allproduct />, <Footer />]} />

            <Route path="/admin" element={[<Header />, <Admin />, <Footer />]} />

            <Route path="/login" element={[<Login />, <Footer />]} />

            <Route
              path="/checkout"
              element={[<Header />, <Checkout />, <Footer />]}
            />

            <Route
              path="/"
              exact
              element={[<Header />, <Welcome />, <Home />, <Footer />]}
            />
          </Routes>
        </div>

  );
}
export default App;
