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

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDq0EnMGd-6qrcIZ0qUQvKxIDJV5uRvtKs",
//   authDomain: "test-project-559e1.firebaseapp.com",
//   projectId: "test-project-559e1",
//   storageBucket: "test-project-559e1.appspot.com",
//   messagingSenderId: "418042337809",
//   appId: "1:418042337809:web:e05f4adbfb8d9d02286fb0",
//   measurementId: "G-7DTEW2E7PY"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };
