const redux = require("redux");

// actions
const ADD_TODO = "Add TODO";
const TOGGLE_TODO = "Toggle Todo";

// actions creators
const addToDo = (text) => ({ text, type: ADD_TODO }); // action object
const toggleToDo = (index) => ({ index, type: TOGGLE_TODO });

// initial state
const initialState = {
  todos: [],
};

// reducers
function toDoReducer(state = initialState, action) {
  // provide default value
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, i) => {
          if (i === action.index) {
            todo.completed = !todo.completed;
          }
          return todo; // this is required as it is not a single line arrow function and we need to return explicitly as soon as we use brackets within arrow function
        }),
      };
    default:
      return state;
  }
}

// store
const store = redux.createStore(toDoReducer); // raw Redux, can be simplified using Redux toolkit

// dispatch actions
store.dispatch(addToDo("Clean room"));
store.dispatch(addToDo("Cook dinner"));
store.dispatch(toggleToDo(0));

// read data from store using selectors
console.log(store.getState());
