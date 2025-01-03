const redux = require("redux");
import { combineReducers } from "redux";
import { counterReducer } from "./redux/reducers/counterReducer";

// import counter reducer function here
const { timerReducer } = require("./redux/reducers/timerReducer");

// combine the reducer functions here
const reducers = combineReducers({
  timer: timerReducer,
  counter: counterReducer,
});

// add the root reducer function to store here
export const store = redux.createStore(reducers);
