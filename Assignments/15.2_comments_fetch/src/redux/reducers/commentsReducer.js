// import redux toolkit methods here
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { comments: [], isLoading: false, error: null };

const commentsSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  reducers: {
    load: (state, action) => {
      state.isLoading = true;
    },
    setInit: (state, action) => {
      state.isLoading = false;
      state.comments = [...action.payload];
    },
    showError: (state, action) => {
      state.isLoading = false;
      state.error = "failed to fetch comments";
    },
  },
});

// define comments reducer function here
export const commentsReducer = commentsSlice.reducer;

// export the comments reducer function and action creators here
export const commentsActions = commentsSlice.actions;

// export the comments selector function here
export const commentsSelector = (state) => state.commentsReducer;
