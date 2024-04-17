// Implement your code for auth reducer
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { user: null, error: false, message: "", loading: false };

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await signOut(auth);
});

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    return res;
  }
);

const setErrorAndResetState = (state, message) => {
  state.user = null;
  state.error = true;
  state.message = message;
  state.loading = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    clearError: (state, action) => {
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        setErrorAndResetState(state, action.error.message);
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        setErrorAndResetState(state, action.error.message);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        setErrorAndResetState(state, action.error.message);
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthUser, clearError } = authSlice.actions;
export const authSelector = (state) => state.auth;
