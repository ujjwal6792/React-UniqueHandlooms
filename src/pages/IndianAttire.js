import React from 'react'
import Product from '../components/Product'
import "../style/Allproduct.css";

function IndianAttire({products}) {
  return (
    
    <div className="home">
        <div className="home__container">
            <div className="productRow">
                  {products?.map((item) => (
                    <Product
                      key={item.id}
                      id={item.id}
                      title={item.Name}
                      price={item.Price}
                      rating={5}
                      image={item.Img}
                      size={item.Size}
                    />
                  ))}
            </div>
        </div>
    </div>
  )
}

export default IndianAttire