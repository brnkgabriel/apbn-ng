// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPdNL5ROe-iyGvp6zfiZgtD_Lbk3qB1p0",
  authDomain: "rcnlagos-f152a.firebaseapp.com",
  projectId: "rcnlagos-f152a",
  storageBucket: "rcnlagos-f152a.appspot.com",
  messagingSenderId: "155753752706",
  appId: "1:155753752706:web:8b98faa857f2786440ec9b",
  measurementId: "G-ZNJBRN4915"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoredb = getFirestore(app)