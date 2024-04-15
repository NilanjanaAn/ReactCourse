import { configureStore } from "@reduxjs/toolkit";

const { timerReducer } = require("./redux/reducers/timerReducer");
const { counterReducer } = require("./redux/reducers/counterReducer");
import { alertReducer } from "./redux/reducers/alertReducer";
// import and include the alert reducer function inside the store

export const store = configureStore({
  reducer: { timerReducer, counterReducer, alertReducer },
});
