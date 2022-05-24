import React from "react";
import "../style/Home.css";
import Product from "./Product";
import Hero from '../images/Hero.png'
import Product1 from '../images/Product_01.PNG'
import Product2 from '../images/Product_02.PNG'
import Product3 from '../images/Product_03.PNG'
import Product4 from '../images/Product_04.PNG'
import Product5 from '../images/Product_05.PNG'
import Product6 from '../images/Product_06.PNG'

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={Hero}
          alt=""
        />

        <div className="home__row">
          <Product
            id="12321341"
            title="Green Suit with Pants and Chunni"
            price={1200}
            rating={5}
            image={Product1}
            size={`M`}
          />
          <Product
            id="49538094"
            title="Yellow Cotton Kurti "
            price={650}
            rating={4}
            image={Product2}
            size={`40`}
          />

          <Product
            id="4903850"
            title="Cyan Kurti with Umbrella Cut Arms "
            price={1050}
            rating={5}
            image={Product3}
            size={`46`}
          />
          <Product
            id="23445930"
            title="Orange White Print Design "
            price={650}
            rating={5}
            image={Product4}
            size={`40,42`}
          />
          <Product
            id="3254354345"
            title="Dual Tone Red-White Kurti Lotus "
            price={700}
            rating={4}
            image={Product5}
            size={`44`}
          />

          <Product
            id="90829332"
            title="Sea Green Kurti with Digital Print "
            price={700}
            rating={4}
            image={Product6}
            size={`40`}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
