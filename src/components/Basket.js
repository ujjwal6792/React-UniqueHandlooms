import React from 'react';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import { useStateValue } from "./StateProvider";

function Basket() {
    const [{ basket, user }] = useStateValue();
    return (
    <div>

     <LocalGroceryStoreRoundedIcon/>
    <span className=" footerBasketCount">{basket?.length}</span>

    </div>
  )
}

export default Basket