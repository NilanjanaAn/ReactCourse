// create and initialize your own firebase here
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr8-4CnnincyeQeg9uzpHZ9KYtooN8N9c",
  authDomain: "photofolio-react-course.firebaseapp.com",
  projectId: "photofolio-react-course",
  storageBucket: "photofolio-react-course.appspot.com",
  messagingSenderId: "191641802398",
  appId: "1:191641802398:web:de5689219f17dce4f20d8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
