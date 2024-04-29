// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEF2-76iyI4mS5ZNO5Wy7uIH9c1eG1woc",
  authDomain: "empapp-d6562.firebaseapp.com",
  projectId: "empapp-d6562",
  storageBucket: "empapp-d6562.appspot.com",
  messagingSenderId: "213924654784",
  appId: "1:213924654784:web:8b7e895794869f36048725"
};

// Initialize Firebase
export const FIREBASE_APP= initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_AUTH)