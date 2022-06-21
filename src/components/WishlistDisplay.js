import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import "../style/WishlistDIsplay.css"

function WishlistDisplay({basket, id}) {
  return (
    <div className="wishlistDisplay" key={id}>  
    { 
        basket?.map((item) => (
            <div className="wishlistProduct" key={item.id}>
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton={'hiddenButton'}                            
          /> 
        </div>
        ))
}
</div>
  )
}

export default WishlistDisplay