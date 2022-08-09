import React, { useState } from "react";
import "../style/Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { db } from "./firebase";

function ConfirmWishlist() {
  const [{ basket, user, userDetailsContext }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [submitProcess, setSubmitProcess] = useState(false);

  const handleSubmit = (e) => {

    const date = new Date();
    const Timename = date.toString()
    e.preventDefault();
    if (user&&basket){
    setSubmitProcess(true)
    db.collection('users').doc(user?.uid)
    .set({
      wishlist: "true"
    }, {merge: true})
    db.collection('users').doc(user?.uid).collection('wishlist').doc(Timename)
      .set({
        date:  Timename,
        uid: user.uid,
        basket: basket,
      })
      .then(() => {
        dispatch({
          type: "RESET_BASKET",
          basket: [],
        });
        navigate("/account");
        setSubmitProcess(false)
      }).catch((err) => {   console.log(err)});
    }else(alert("You need to login/signUp"))
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Wishlist (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{userDetailsContext[0]?.address}</p>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items</h3>
          </div>
          <div className="payment__items">
            { 
            basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              /> 
            ))
}
            
          </div>
        </div>
        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Order Amount</h3>
          </div>
          <div className="payment__details">
            {/* Stripe rn, Gpay soon*/}
            <form onSubmit={handleSubmit}>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹​"}
                />
                <button type="submit">
                  <span>{!submitProcess? `Add Now`: `Processing...`}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmWishlist;
