// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVlA14SZok8N3A_sTLdNOc38Bm-aenWek",
  authDomain: "codebrnk.firebaseapp.com",
  projectId: "codebrnk",
  storageBucket: "codebrnk.appspot.com",
  messagingSenderId: "957063190204",
  appId: "1:957063190204:web:9c47a3c92f9f8039e422b9",
  measurementId: "G-88678EC86D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoredb = getFirestore(app)
export const storage = getStorage(app)