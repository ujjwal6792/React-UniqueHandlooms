import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import "../style/WishlistDIsplay.css"

function WishlistDisplay({basket, id}) {

  const time = id.slice(16, 25)
  const date =id.slice(0,16)

  return (
    <div className="wishlistDisplay" key={id}>  

    <p className='innerTime rotate'>{time} </p>
    <p className='innerDate rotate'> {date}</p>
    { 
        basket?.map((item,i) => (
            <div className="wishlistProduct" key={item.id+i}>
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