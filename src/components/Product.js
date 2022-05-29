import React from "react";
import "../style/Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating,size }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        size: size,
      },
    });
  };

  return (
    <div key={id} className="product">
      <div  className="product__info">
        <p className="product__title">{title}</p>
        <div className="size__price">
          <p className="product__rating">Size:{size}</p>
          <p className="product__price">
            <small> &#8377;</small>
            <strong>{price}</strong>
          </p>
        </div>
        {/* <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#9733;</p>
            ))}
        </div> */}
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
