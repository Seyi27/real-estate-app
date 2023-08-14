import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDycJxrm-7Ng6aXLdSXzBNlgqLPe5W3fvw",
  authDomain: "real-estate-project-5da13.firebaseapp.com",
  projectId: "real-estate-project-5da13",
  storageBucket: "real-estate-project-5da13.appspot.com",
  messagingSenderId: "25970113316",
  appId: "1:25970113316:web:e3467af258291da1c4d1b1"
};

// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);
const db= firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage;


export {auth,storage,firebase};
export default db