import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import "../style/WishlistDIsplay.css";

function WishlistDisplay({ basket, id }) {
  const time = id.slice(16, 25);
  const date = id.slice(0, 16);
  const [{ user}, dispatch] =
    useStateValue();
    // Delete wishlist
    const deleteWishlist = (e,id) => {
      e.preventDefault();
      const deleteRef = db.collection("users").doc(user?.uid).collection("wishlist").doc(id);
      if (window.confirm("Are you sure?")) {
        deleteRef.delete()
    }};
  

  return (
    <div className="wishlistDisplay" key={id}>
      <p className="innerTime rotate">{time} </p>
      <p className="innerDate rotate"> {date}</p>
      {basket?.map((item, i) => (
        <div className="wishlistProduct" key={id +i}>
          <CheckoutProduct key={id +i +i }
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton={"hiddenButton"}
          />
        </div>
      ))}
      <div className="deleteWishlist" onClick={ (e)=> deleteWishlist(e, id)}>
        <img src="https://img.icons8.com/external-aficons-studio-basic-outline-aficons-studio/64/000000/external-delete-user-interface-aficons-studio-basic-outline-aficons-studio.png" />
      </div>
    </div>
  );
}

export default WishlistDisplay;
