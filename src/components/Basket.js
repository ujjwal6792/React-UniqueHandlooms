import React from 'react';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import { useStateValue } from "./StateProvider";

function Basket() {
    const [{ basket, user }] = useStateValue();
    return (
    <div>

<img src="https://img.icons8.com/external-aficons-studio-basic-outline-aficons-studio/64/undefined/external-like-user-interface-aficons-studio-basic-outline-aficons-studio.png"/>
    <span className=" footerBasketCount">{basket?.length}</span>

    </div>
  )
}

export default Basket