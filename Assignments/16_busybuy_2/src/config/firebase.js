import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  // Config your firebase here
  apiKey: "AIzaSyCoU8TtnR5JFddxLI1HzRwFQwkaFVI8gqA",
  authDomain: "busybuy-redux-react-course.firebaseapp.com",
  projectId: "busybuy-redux-react-course",
  storageBucket: "busybuy-redux-react-course.appspot.com",
  messagingSenderId: "896378388379",
  appId: "1:896378388379:web:abd200822563ca9ed9ab3e"
};

const app = initializeApp(firebaseConfig);
console.log(process.env);
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export { db, auth };
