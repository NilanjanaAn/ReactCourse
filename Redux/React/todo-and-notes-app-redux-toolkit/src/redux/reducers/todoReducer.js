// import { ADD_TODO, TOGGLE_TODO } from "../actions/todoActions";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  // not used anymore as we are fetching it from the API
  todos: [
    {
      text: "Cook dinner",
      completed: true,
    },
    {
      text: "Exercise",
      completed: false,
    },
  ],
};

// export function todoReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           {
//             text: action.text,
//             completed: false,
//           },
//         ],
//       };
//     case TOGGLE_TODO:
//       return {
//         ...state,
//         todos: state.todos.map((todo, i) => {
//           if (i === action.index) {
//             todo.completed = !todo.completed;
//           }
//           return todo;
//         }),
//       };
//     default:
//       return state;
//   }
// }

export const getInitStateAsync = createAsyncThunk(
  "todo/getInit",

  // dispatch methods
  // (arg, thunkAPI) =>
  // {
  //   axios.get("http://localhost:4100/api/todos").then((res) => {
  //     console.log(res.data);
  //     thunkAPI.dispatch(todoActions.setInit(res.data));
  //   });
  // }

  // async (_, thunkAPI) => {
  //   try {
  //     const res = await axios.get("http://localhost:4100/api/todos");
  //     thunkAPI.dispatch(todoActions.setInit(res.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // extraReducers method
  () => {
    return axios.get("http://localhost:4100/api/todos");
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodo",
  async (payload) => {
    const response = await fetch("http://localhost:4100/api/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: payload,
        completed: false,
      }),
    });
    console.log("response", response);
    return response.json(); // returns a promise
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    setInit: (state, action) => {
      state.todos = [...action.payload]; // set with the API data // no longer required if using extraReducers
    },
    add: (state, action) => {
      // no longer required if using extraReducers
      state.todos.push({ text: action.payload, completed: false });
    },
    toggle: (state, action) => {
      state.todos.map((todo, i) => {
        if (i === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitStateAsync.fulfilled, (state, action) => {
        state.todos = [...action.payload.data];
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.todos.push(action.payload);
      });
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
export const todoSelector = (state) => state.todoReducer.todos;
