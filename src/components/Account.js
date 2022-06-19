import React, { useState } from "react";
import { db } from "./firebase";
import firebase from "./firebase";
import { useStateValue } from "./StateProvider";
import "../style/Account.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [userDetail, setUserDetail] = useState(null);
  const userRef = firebase.firestore().collection("users");

  useEffect(() => {
    setUid(user?.uid);
    userRef.get().then(async(collections) => {
     await setUserDetail(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      console.log(userDetail)
      const  setUserState =()=>{
        userDetail?.map(
          (item) =>
            item.id == uid && (
              dispatch({
                type: "USER_DETAILS",
                details: {
                  firstname:item.firstname ,
                  surname:item.surname ,
                  address:item.address ,
                  phone:item.phone ,
                  email:item.email,
                },
              })
            )
        )
          }
        setUserState()
    }

    );
  }, [updateDetailsComplete]);

  const submitUserDetails = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(uid)
      .set({
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
        }, 3000);
      });
  };


  if (user) {
    return (
      <div className="account">
            { userDetailsContext&& <div className="accountDetails">
                <h4>Your Account Details</h4>
                <p id="userName">{`${ userDetailsContext[0]?.firstname} ${ userDetailsContext[0]?.surname}`}</p>
                <p id="userPhone">{ userDetailsContext[0]?.phone}</p>
                <p id="userEmail">{ userDetailsContext[0]?.email}</p>
                <p id="userAddress"> { userDetailsContext[0]?.address} </p>
                <button onClick={()=>setUpdateDetails(true)}>Update My Details</button>
              </div>
  }
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
          <h4>Your Query List</h4>
          {basket.map((item) => (
            <div>
              <div> {item.id} </div>
              <div> {item.title} </div>
              <div> {item.image} </div>
              <div> {item.price} </div>
              <div> {item.rating} </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
}

export default Account;
