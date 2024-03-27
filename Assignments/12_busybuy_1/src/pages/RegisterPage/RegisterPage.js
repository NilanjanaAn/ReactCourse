import React, { useRef, useEffect, useContext } from "react";
import styles from "./RegisterPage.module.css";
import { useAuthValue } from "../../context/Auth/AuthState";
import validator from "validator";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const {
    user,
    loading,
    register,
    error,
    message,
    clearError,
    isAuthenticated,
  } = useAuthValue();

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage if user is already authenticated or registration fails
    if (isAuthenticated && user) {
      navigate("/");
    }
    if (error) {
      toast.error(message.split("/")[1]);
      clearError();
    }
  }, [error, message, isAuthenticated, user]);

  // Create your state or ref here to store the value of the input fields
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // write the submit handler function to validate the form and signup the user
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (name === "" || email === "" || password === "" || password.length < 6) {
      return toast.error("Please enter valid data!");
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      toast.error("Please enter valid email.");
      return;
    }

    // const isStrongPassword = validator.isStrongPassword(password);
    // if (!isStrongPassword) {
    //   toast.info("Please enter strong password.");
    //   return;
    // }

    // Call the register function from AuthContextProvider
    await register({ name, email, password });

    const userRef = doc(db, "users", auth.currentUser.uid);
    // Create a user document in Firestore with additional user details
    await setDoc(userRef, {
      email: auth.currentUser.email,
      name: auth.currentUser.displayName
    });
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          ref={nameRef}
          className={styles.loginInput}
        />
        <input
          type="email"
          name="email"
          className={styles.loginInput}
          ref={emailRef}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          className={styles.loginInput}
          ref={passwordRef}
          placeholder="Enter Password"
        />
        <button className={styles.loginBtn}>
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
