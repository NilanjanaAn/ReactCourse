import { noteActions } from "./noteReducer";
import { todoActions } from "./todoReducer";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    // to do something independently on this slice
    reset: (state, action) => {
      state.message = "";
    },
  },
  
  // not recommended
  // extraReducers: {
  //   // to perform dependent actions
  //   "todo/add": (state, action) => {
  //     // name/action
  //     state.message = "A new to-do has been created!";
  //   },
  //   "note/add": (state, action) => {
  //     state.message = "A new note has been created!";
  //   },
  // },

  // builder method (recommended)
  extraReducers: (builder) => {
    builder
      .addCase(todoActions.add, (state, action) => {
        state.message = "A new to-do has been created!";
      })
      .addCase(noteActions.add, (state, action) => {
        state.message = "A new note has been created!";
      });
  },

  // map method
  // extraReducers: {
  //   // map objects: [key]: value
  //   [todoActions.add]: (state, action) => {
  //     state.message = "A new to-do has been created!";
  //   },
  //   [noteActions.add]: (state, action) => {
  //     state.message = "A new note has been created!";
  //   },
  // },
});

export const notificationReducer = notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
export const notificationSelector = (state) =>
  state.notificationReducer.message;
