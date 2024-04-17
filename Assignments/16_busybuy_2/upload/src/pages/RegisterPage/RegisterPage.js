import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./RegisterPage.module.css";
import {
  authSelector,
  clearError,
  signup,
} from "../../redux/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // Input refs
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { user, error, loading, message } = useSelector(authSelector);
  const isAuthenticated = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // If user is authenticated redirect him to home page
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [user]);

  // If some error occurs display the error
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(clearError());
    }
  }, [error]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const nameVal = nameRef.current.value;
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (
      emailVal === "" ||
      nameVal === "" ||
      passwordVal === "" ||
      passwordVal.length < 6
    ) {
      return toast.error("Please enter valid data!");
    }

    // call the signup function usig redux here
    dispatch(signup({name: nameVal, email: emailVal, password: passwordVal}));
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className={styles.loginInput}
        />
        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className={styles.loginInput}
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
