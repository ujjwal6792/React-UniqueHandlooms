import React, { useState, useEffect } from 'react'
import firebase from "./firebase";

function UserDetails({uid}) {

    const [userRender, setUserRender]= useState(null)

    const userRef = firebase
    .firestore()
    .collection(`users`)
    .doc(uid)

    useEffect(() => {
        userRef
        .onSnapshot((doc) => {
        setUserRender({ ...doc.data(), id: doc.id })
        }) 
      },[])

  return (
    <>
    <div className="userDisplayModule">
            
    </div>


    </>
  )
}

export default UserDetails