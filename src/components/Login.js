import React, { useState } from "react";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Logo from "../images/Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/account");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    navigate("/register")
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src= {Logo}
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
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

          <div className="buttons">
            <button
              type="submit"
              onClick={signIn}
              className="login__signInButton"
            >
              Sign In
            </button>
            <button onClick={register} className="login__registerButton">
          Create your Account
        </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
