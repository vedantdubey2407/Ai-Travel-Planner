// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXpnukcNdbDbb8HHh23OO7HkSSHApA0Xg",
  authDomain: "react-app-8f3e3.firebaseapp.com",
  projectId: "react-app-8f3e3",
  storageBucket: "react-app-8f3e3.firebasestorage.app",
  messagingSenderId: "990764307969",
  appId: "1:990764307969:web:3d003ee32f1dfd5e06d200",
  measurementId: "G-42E4V5J36Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore()
