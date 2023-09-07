// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl9ensxBYokqU3xSoGttnfwZIrRwjxIqE",
  authDomain: "apbn-ng.firebaseapp.com",
  projectId: "apbn-ng",
  storageBucket: "apbn-ng.appspot.com",
  messagingSenderId: "1009247673456",
  appId: "1:1009247673456:web:5c6209fa2f027fc89d28b5",
  measurementId: "G-2JTETLV52F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoredb = getFirestore(app)
export const storage = getStorage(app)