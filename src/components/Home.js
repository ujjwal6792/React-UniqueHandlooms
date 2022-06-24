import React from "react";
import "../style/Home.css";
import Hero from "../images/Hero.avif";
import { Link, useNavigate } from "react-router-dom";
import BedsheetBanner from "../images/homeimages/BedsheetBannerW.avif"
import CarpetsMats from "../images/homeimages/CarpetsMats.avif"
import CushionAndBolsterBanner from "../images/homeimages/CushionAndBolsterBanner.avif"
import IndianAttire from "../images/homeimages/IndianAttire.avif"
import Mattresses from "../images/homeimages/Mattresses.avif"
import TowelsRobes from "../images/homeimages/TowelsRobes.avif"


function Home() {
  const navigate = useNavigate()
  const navigateIA = () => navigate("/IndianAttire")
  const navigateBedsheet = () => navigate("/Bedsheets")
  const navigateCarpetsandMats = () => navigate("/CarpetsandMats")
  const navigateCushions = () => navigate("/Cushions")
  const navigateTowels = () => navigate("/Towels")
  const navigateMattress = () => navigate("/Mattress")

  return (
    <div className="allProducts">
        <div className="hero">
          <img className="heroImage" src={Hero} alt="" />
          <div className="heroText">
            <h2>20% Discount</h2>
            <p>On your first purchase</p>
          </div>
        </div>

        <div className="productTopBar">
          <h2>Our Collection</h2>
          <h2 className="cursorPointer">filters</h2>
        </div>

      <div className="productContainer">
      </div>
            <div className="productRange">
              <img className="productImgWide" src={IndianAttire} alt="indian attires" onClick={ navigateIA } />
              <img src={BedsheetBanner} alt="bedsheets banner" onClick={navigateBedsheet } />
              <img src={CarpetsMats} alt="carpets and mats" onClick={navigateCarpetsandMats}/>
              <img src={CushionAndBolsterBanner} alt="cushion and bolster banner" onClick={navigateCushions}/>  
              <img src={TowelsRobes} alt="towels  banner" onClick={navigateTowels}/>
              <img className="productImgWide" src={Mattresses} alt="mattresses banner" onClick={navigateMattress} />
            </div>
            <Link to="/allproducts" className="allProductsButton">
            <button>All Products</button>
          </Link>
    </div>
  );
}

export default Home;
