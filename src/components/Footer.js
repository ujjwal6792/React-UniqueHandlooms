import React from "react";
import "../style/Footer.css";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import {FiFacebook, FiInstagram, FiMail  } from "react-icons/fi"

function Footer() {
  const date = new Date()
  const year = date.toString().slice(11,16)

  return (
    <footer>
       <div className="content">
     <div className="left box">
       <div className="upper">
         <div className="topic">About us</div>
         <p> Unique Handlooms brings handpicked products in categories like clothing, home decor and home comfort.</p>
       </div>
       <div className="lower">
         <div className="topic">Contact us</div>
         <div className="phone">
           <p><i className="fas fa-phone-volume"></i>+91-8527708082</p>
         </div>
         <div className="email">
           <p><i className="fas fa-envelope"></i>uniquehandlooms.ghaziabad@gmail.com</p>
         </div>
       </div>
     </div>
     <div className="middle box">
       <div className="topic">Our Products</div>
       <div><p>Bedsheets and Dohars</p></div>
       <div><p>Latest Indian Clothing</p></div>
       <div><p>Comfort and cushioning</p></div>
       <div><p>Floormats and Carpets</p></div>
       <div><p>Towels and Bathing accessories</p></div>
     </div>
     <div className="right box">
       <div className="topic">Inquire us</div>
       <form action="#" >
         <input type="text" placeholder="Enter your query" />
         <button>Send</button>
         <div className="media-icons">
           <a><FiFacebook/></a>
           <a><FiInstagram/></a>
           <a><FiMail/></a>
         </div>
         <div className="bottom">
     <p>Copyright © {year} <a>Unique Handlooms</a></p>
   </div>
       </form>
     </div>
   </div>

      {/* mobile */}
      <div className="footer">
        <Link to="/" className="footerItems ">
        <img src="https://img.icons8.com/external-aficons-studio-basic-outline-aficons-studio/64/undefined/external-home-user-interface-aficons-studio-basic-outline-aficons-studio.png"/>
        </Link>
        <Link to="/allproducts" className="footerItems ">
        <img src="https://img.icons8.com/external-aficons-studio-basic-outline-aficons-studio/64/undefined/external-add-user-interface-aficons-studio-basic-outline-aficons-studio.png"/>
        </Link>
        <Link to="/account" className="footerItems ">
        <img src="https://img.icons8.com/external-aficons-studio-basic-outline-aficons-studio/64/undefined/external-user-user-interface-aficons-studio-basic-outline-aficons-studio.png"/>
        </Link>
        <Link to="/checkout" className="footerItems ">
        <Basket/>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
