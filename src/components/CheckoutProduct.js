import React from "react";
import "../style/CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, hideButton, size }) {
  const [{}, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct" key={id}>
      <img className="checkoutProduct__image" src={image} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>&#8377; </small>
          <strong>{price}</strong>
        </p>
        {
          <button className={hideButton} onClick={removeFromBasket}>
            Remove
          </button>
        }
      </div>
    </div>
  );
}

export default CheckoutProduct;
