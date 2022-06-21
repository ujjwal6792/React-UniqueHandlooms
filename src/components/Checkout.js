import React from "react";
import "../style/Checkout.css";
import Subtotal from "./SubTotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket,user, userDetailsContext }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkoutLeft">
        <div>
          <h3>
            Hello{user? `, ${userDetailsContext[0]?.firstname} ${userDetailsContext[0]?.surname}` : ", Guest"}
          </h3>
          <h2 className="checkoutTitle">Your shopping Basket</h2>

          {basket.map((item) => (
            <CheckoutProduct
              id={item?.id}
              title={item?.title}
              image={item?.image}
              price={item?.price}
              rating={item?.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkoutRight">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
