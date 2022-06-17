import React, { useState } from "react";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Logo from "../images/Logo.png";
import "../style/Login.css";

function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ basket, user }] = useStateValue();

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        return db.collection("users").doc(auth.user.uid).set({
            firstname,
            surname,
            email,
            address,
            phone,
        })
      }).then(()=>{navigate('/')})
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={Logo} alt="" />
      </Link>

      <div className="login__container">
        <form action="account">
          <h5>First name</h5>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
           <h5>Last name</h5>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>Phone Number</h5>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <h5>Address</h5>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="buttons">
            <button type="submit" onClick={register} className="login__signInButton">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
