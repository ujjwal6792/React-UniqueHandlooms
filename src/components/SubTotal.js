import React from "react";
import "../style/SubTotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { Link } from "react-router-dom";

function Subtotal() {
  const [{ basket }] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ( {basket.length} items): <strong>{value}</strong>
            </p>
            {/* <small className="subtotalGift">
              <input type="checkbox" /> This order contains a gift
            </small> */}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={	`₹​` }
      />
      <Link to ="/confirmWishlist">
      <button className="paymentbutton">Add to Wishlist</button>
      </Link>
    </div>
  );
}

export default Subtotal;
