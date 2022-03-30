// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore/lite';

// web configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3JbJQMngH1woVBn9GUR4SStGRyEBWGl8",
  authDomain: "orbit-invoice.firebaseapp.com",
  projectId: "orbit-invoice",
  storageBucket: "orbit-invoice.appspot.com",
  messagingSenderId: "982453507458",
  appId: "1:982453507458:web:75ad8094436f63cc87ab9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;