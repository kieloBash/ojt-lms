// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "umonicsmethod-af24d.firebaseapp.com",
  projectId: "umonicsmethod-af24d",
  storageBucket: "umonicsmethod-af24d.appspot.com",
  messagingSenderId: "135337549602",
  appId: "1:135337549602:web:5ea9938b48158712d2cf7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
