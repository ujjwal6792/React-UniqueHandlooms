import React, { useState } from "react";
import { db } from "./firebase";
import firebase from "./firebase";
import { useStateValue } from "./StateProvider";
import "../style/Account.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import CheckoutProduct from "./CheckoutProduct";

function Account() {
  const navigate = useNavigate();
  const [{ basket, user, userDetailsContext }, dispatch] = useStateValue();
  const [updateDetails, setUpdateDetails] = useState(null);
  const [uid, setUid] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [updateDetailsComplete, setUpdateDetailsComplete] = useState("");
  const [wishlistRender, setWishlistRender] = useState(null);
  const userRef = firebase.firestore().collection("users");

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((doc) => {
        const userDetails = { ...doc.data(), id: doc.id };

        dispatch({
          type: "USER_DETAILS",
          details: {
            firstname: userDetails.firstname,
            surname: userDetails.surname,
            address: userDetails.address,
            phone: userDetails.phone,
            email: userDetails.email,
          },
        });
      });
    }
  }, [userDetailsContext]);

  useEffect(() => {
    setFirstname(userDetailsContext[0].firstname);
    setSurname(userDetailsContext[0].surname);
    setEmail(userDetailsContext[0].email);
    setPhone(userDetailsContext[0].phone);
    setAddress(userDetailsContext[0].address);
  }, [updateDetails]);

  const submitUserDetails = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user.uid)
      .update({
        firstname,
        surname,
        address,
        phone,
        email,
      })
      .then(() => {
        setUpdateDetailsComplete("your details have been updated successfully");
        setFirstname("");
        setSurname("");
        setAddress("");
        setPhone("");
        setEmail("");
        setTimeout(() => {
          setUpdateDetailsComplete("");
          setUpdateDetails(false);
        }, 3000);
      });
  };

  // Delete wishlist
  const deleteWishlist = (e, id) => {
    e.preventDefault();
    const deleteRef = doc(db, user.uid, id);
    if (window.confirm("Are you sure?")) {
      deleteDoc(deleteRef);
      // setSucess("Website Deleted");
      setTimeout(() => {
        // setWishlistRender("");
      }, 5000);
    }
  };

  const wishlistRef = firebase.firestore().collection(user.uid);
  useEffect(() => {
    wishlistRef.get().then((collections) => {
      setWishlistRender(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  });

  if (user) {
    return (
      <div className="account">
        {userDetailsContext && (
          <div className="accountDetails">
            <h4>Your Account Details</h4>
            <p id="userName">{`${userDetailsContext[0]?.firstname} ${userDetailsContext[0]?.surname}`}</p>
            <p id="userPhone">{userDetailsContext[0]?.phone}</p>
            <p id="userEmail">{userDetailsContext[0]?.email}</p>
            <p id="userAddress"> {userDetailsContext[0]?.address} </p>
            <button
              onClick={() => setUpdateDetails(!updateDetails ? true : false)}
            >
              {!updateDetails ? "Update My Details" : "close"}
            </button>
          </div>
        )}
        {updateDetails ? (
          <div className="editAccount">
            <h4>Update Your Account</h4>
            <form action="account">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Last Name"
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <button type="submit" onClick={submitUserDetails}>
                {" "}
                {updateDetailsComplete ? updateDetailsComplete : `Update Info`}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
        <div className="accountWish">
          <h4>Your WishList</h4>
          {wishlistRef.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.Title}
              price={item.Price}
              image={item.Img}
              size={item.Size}
            />
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}

export default Account;
