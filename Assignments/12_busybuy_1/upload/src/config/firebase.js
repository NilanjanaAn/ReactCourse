// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Initialize Firebase and configure the firebase.
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC572ILQMVdlSI7Df3H6wgB4KgGnfpul2Q",
  authDomain: "busybuy-react-course.firebaseapp.com",
  projectId: "busybuy-react-course",
  storageBucket: "busybuy-react-course.appspot.com",
  messagingSenderId: "548259214359",
  appId: "1:548259214359:web:b38dd8d0ba2816735e5852",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Firebase authentication and Firestore database objects
export const auth = getAuth(app); // Firebase authentication object
export const db = getFirestore(app); // Firestore database object

setPersistence(auth, browserLocalPersistence);

// Export Firestore collections for products, user carts, user orders, and users
export const productCollection = collection(db, "products");
export const cartCollection = collection(db, "userCart");
export const orderCollection = collection(db, "userOrder");
export const userCollection = collection(db, "users");
