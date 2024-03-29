import { useContext, useReducer, useEffect } from "react";
import AuthContext from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

// Action types related to user login
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

// Action types related to user registration
const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

// Action types related to loading user data
const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
const LOAD_USER_FAIL = "LOAD_USER_FAIL";

// Action types related to setting user data of authenticated user
const SET_USER_REQUEST = "SET_USER_REQUEST";
const SET_USER_SUCCESS = "SET_USER_SUCCESS";
const SET_USER_FAIL = "SET_USER_FAIL";

// Action types related to user logout
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_FAIL = "LOGOUT_FAIL";

// Action type to clear any error messages in the state
const CLEAR_ERRORS = "CLEAR_ERRORS";

// Custom hook to access the AuthContext value
export const useAuthValue = () => {
  const value = useContext(AuthContext);
  return value;
};

// Reducer function to manage state changes for user authentication
const authReducer = (state, action) => {
  switch (action.type) {
    // Cases for actions related to login, registration, user loading, and setting user data
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case SET_USER_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
      };

    // Cases for successful login, registration, user loading, and setting user data
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case SET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    // Cases for login, registration, and user loading failures
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        error: true,
        message: action.payload,
        isAuthenticated: false,
      };

    // Case for successful logout
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: false,
        message: action.payload,
        loading: false,
        isAuthenticated: false,
      };

    // Cases for logout and setting user data failures
    case LOGOUT_FAIL:
    case SET_USER_FAIL:
      return {
        ...state,
        error: true,
        message: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    // Case to clear any error messages in the state
    case CLEAR_ERRORS:
      return {
        ...state,
        error: false,
        message: null,
      };

    // Default case for when the dispatched action type is not recognized
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  // Initial state for user authentication
  const initialState = {
    user: null,
    error: false,
    message: null,
    loading: false,
    isAuthenticated: false,
  };

  // Use reducer to manage state changes based on dispatched actions
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      }
    });
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: LOGIN_SUCCESS, payload: res.user });
      toast.success("Login Successfully.");
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message.split(":")[1] });
    }
  };

  // Function to handle user registration
  const register = async (formData) => {
    dispatch({ type: REGISTER_USER_REQUEST });

    try {
      const { name, email, password } = formData;

      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: res.user });
      toast.success("Registered Successfully.");
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.message.split(":")[1],
      });
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: LOGOUT_SUCCESS });
      toast.success("Log Out successfully.");
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: "Something went wrong!" });
    }
  };

  // Function to clear error messages from the state
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // Function to set the authenticated user
  const setUser = async (user) => {
    try {
      dispatch({ type: SET_USER_REQUEST });
      dispatch({ type: SET_USER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: SET_USER_FAIL, payload: error.message.split(":")[1] });
    }
  };

  // Destructure the state values for user authentication
  const { user, message, error, loading, isAuthenticated } = state;

  // Provide the authentication state and actions through the AuthContext
  return (
    <AuthContext.Provider
      value={{
        user,
        message,
        error,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        clearError,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
