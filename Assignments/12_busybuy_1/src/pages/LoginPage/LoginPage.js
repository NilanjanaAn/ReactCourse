import React, { useRef, useContext, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/Auth/AuthState";
import { toast } from "react-toastify";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error, message, login, clearError, user } =
    useAuthValue();

  useEffect(() => {
    // Redirect to homepage if user is already authenticated or login fails
    if (isAuthenticated && user) {
      navigate("/");
    }

    if (error) {
      toast.error(message);
      clearError();
    }
  }, [error, isAuthenticated, user, message]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    await login(email, password);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h2 className={styles.loginTitle}>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          ref={emailRef}
          className={styles.loginInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          ref={passwordRef}
          className={styles.loginInput}
        />
        <button className={styles.loginBtn} onClick={(e)=>handleLogin(e)}>
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
