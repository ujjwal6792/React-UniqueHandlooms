import React, { useState, useEffect } from "react";
import "../style/Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function ConfirmWishlist() {
  const [{ basket, user, userDetailsContext }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [basketItems, setBasketItems] = useState(null);
  const [success, setSuccess] = useState(false);

  const [bsId, setBsId] = useState(null);
  const [bsTitle, setBsTitle] = useState(null);
  const [bsPrice, setBsPrice] = useState(null);
  const [bsSize, setBsSize] = useState(null);
  useEffect(() => {
    if(basket.length > 0) {
    const wishlistId = basket.map((item) => {
      const id = [item.id].reduce((acc, item) => acc+" "+ item) ;
      return id
    });
    const wishlistName = basket.map((item) => {
        const name = [item.title].reduce((acc, item) => acc+" "+ item) ;
        return name
      });

      const wishlistSize = basket.map((item) => {
        const size = [item.size].reduce((acc, item) => acc+" "+ item) ;
        return size
      });

      const wishlistPrice = basket.map((item) => {
        const price = [item.price].reduce((acc, item) => acc+" "+ item) ;
        return price
      });
 
    setBsId(wishlistId.reduce((acc, item) => acc+" "+ item))
    setBsTitle(wishlistName.reduce((acc, item) => acc+" , "+ item))
    setBsSize(wishlistSize.reduce((acc, item) => acc+"  "+ item))
    setBsPrice(wishlistPrice.reduce((acc, item) => acc+"  "+ item))
      }
  }, [basket, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection(user.uid)
      .add({
        ProductId: bsId,
        ProductName: bsTitle,
        ProductSize: bsSize,
        ProductPrice: bsPrice,
        UserName: userDetailsContext[0].firstname,
        UserAddress: userDetailsContext[0].address,
        UserEmail: userDetailsContext[0].email,
        UserPhone: userDetailsContext[0].phone,
      })
      .then(() => {
        dispatch({
          type: "RESET_BASKET",
          details: [],
        });
        setSuccess(true);
        navigate("/account");
        window.location.reload()
      }).catch((err) => {   console.log(err)});
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
        {console.log(basket) }
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
                  <span>Add Now</span>
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
