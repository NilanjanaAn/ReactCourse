// const redux = require("redux");
// const todoReducer = require("../reducers/todoReducer");

import * as redux from "redux";
import { combineReducers } from "redux";
import { todoReducer } from "./reducers/todoReducer";
import { noteReducer } from "./reducers/noteReducer";

const reducers = combineReducers({
  todoRed: todoReducer,
  noteRed: noteReducer,
});

export const store = redux.createStore(reducers);
