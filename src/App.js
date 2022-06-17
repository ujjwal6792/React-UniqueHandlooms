import React, { useEffect } from "react";
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
import { auth } from "./components/firebase";
import { useStateValue } from "./components/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Allproduct from "./components/Allproduct";
import Account from "./components/Account";
import Register from "./components/Register";

const promise = loadStripe(
  "pk_test_51L1VGKSAA1y0OG767dnJldN2dLqf3sVagPzy5A15o7x1jYSBQ0rpRvT9sr31o0sP8mpP1pxsDhN6dzqVt2vOW7Oq00vKGDnUKg"
);
function App() {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret:
  //     "{{sk_test_51L1VGKSAA1y0OG76PbZww8g7pZsj91G4tDe0k8iRxzU0gC1fY8QKQBUsMNgcnRTJdIwM0ue3iKGf9rNCH1Uaxpru008ilkAIfm}}",
  // };
  const [{ basket }, dispatch] = useStateValue();
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
      <Elements stripe={promise} element={[<Payment />]}>
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
      </Elements>
    </Router>
  );
}
export default App;
