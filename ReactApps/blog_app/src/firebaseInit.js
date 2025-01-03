// create firebase config here and export the db object
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeruuBdMygGaoXSGHxZyYZDoVWyTFJXC0",
  authDomain: "blog-app-react-course.firebaseapp.com",
  projectId: "blog-app-react-course",
  storageBucket: "blog-app-react-course.appspot.com",
  messagingSenderId: "479888413444",
  appId: "1:479888413444:web:d4978017ca37734798f651"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);