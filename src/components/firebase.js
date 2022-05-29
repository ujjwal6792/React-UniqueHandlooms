import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWXzHq4i9sANSr3oQRjcX1c1t2eColI_U",
  authDomain: "unique-handlooms.firebaseapp.com",
  projectId: "unique-handlooms",
  storageBucket: "unique-handlooms.appspot.com",
  messagingSenderId: "836829014939",
  appId: "1:836829014939:web:c7672303f7995f003bcf3e",
  measurementId: "G-63EXNQ2L1D",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };