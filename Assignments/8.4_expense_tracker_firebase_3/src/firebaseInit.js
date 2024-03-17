// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKBDwo4NX8mpIZ0g7ptIvl3Sjmi7VyvWo",
  authDomain: "expense-tracker-react-course.firebaseapp.com",
  projectId: "expense-tracker-react-course",
  storageBucket: "expense-tracker-react-course.appspot.com",
  messagingSenderId: "753265457560",
  appId: "1:753265457560:web:6fd9aa66481137d59313ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);