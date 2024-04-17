import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  authSelector,
  clearError,
  login,
} from "../../redux/reducers/authReducer";

const LoginPage = () => {
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
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (emailVal === "" || passwordVal === "" || passwordVal.length < 6) {
      return toast.error("Please enter valid data!");
    }
    // write function here to login the user using redux
    dispatch(login({ email: emailVal, password: passwordVal }));
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign In</h2>
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
          {loading ? "..." : "Sign In"}
        </button>
        <NavLink
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#224957",
            fontFamily: "Quicksand",
          }}
        >
          <p style={{ fontWeight: "600", margin: 0 }}>Or SignUp instead</p>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
