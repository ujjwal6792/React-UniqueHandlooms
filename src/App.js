import React, { useEffect, useState } from "react";
import "./style/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Header from "./components/Header";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import { db, auth } from "./components/firebase";
import firebase from "./components/firebase";
import {doc, getDoc} from "firebase/firestore"
import { useStateValue } from "./components/StateProvider";
import Allproduct from "./components/Allproduct";
import Account from "./components/Account";
import Register from "./components/Register";

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

  return (
    // BEM

    <Router>
      
        <div className="app">
          <Routes>
            <Route path="/register" element={[<Register />, <Footer />]} />

            <Route path="/account" element={[<Header/>, <Account />, <Footer />]} />

            <Route path="/allproducts" element={[<Allproduct />, <Footer />]} />

            <Route path="/addproduct" element={<Admin />} />

            <Route path="/login" element={[<Login />, <Footer />]} />

            <Route
              path="/payment"
              element={[<Header />, <Payment />, <Footer />]}
            />

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
    </Router>
  );
}
export default App;
