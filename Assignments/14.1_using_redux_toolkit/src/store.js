const redux = require("redux");
const { configureStore } = require("@reduxjs/toolkit");

const { timerReducer } = require("./redux/reducers/timerReducer");
const { counterReducer } = require("./redux/reducers/counterReducer");

// // refactor to use configureStore
// const rootReducer = redux.combineReducers({
//   timer: timerReducer,
//   counter: counterReducer
// });
// export const store = redux.createStore(rootReducer);

export const store = configureStore({
  reducer: {
    counterReducer,
    timerReducer,
  },
});
