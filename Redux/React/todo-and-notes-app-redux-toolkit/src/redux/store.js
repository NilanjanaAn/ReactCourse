// const redux = require("redux");
// const todoReducer = require("../reducers/todoReducer");

// import * as redux from "redux";
// import { combineReducers } from "redux";
import { todoReducer } from "./reducers/todoReducer";
import { noteReducer } from "./reducers/noteReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

// const reducers = combineReducers({
//   todoRed: todoReducer,
//   noteRed: noteReducer,
// });

// export const store = redux.createStore(reducers);

export const store = configureStore({
  reducer: {
    todoReducer,
    noteReducer,
    notificationReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    loggerMiddleware,
  ],
});
