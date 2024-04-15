// import { ADD_NOTE, DELETE_NOTE } from "../actions/noteActions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  notes: [
    {
      text: "I'd always thought lightning was something only I could see.",
      createdOn: new Date(),
    },
    {
      text: "For some unfathomable reason, the response team didn't consider a lack of milk for my cereal as a proper emergency.",
      createdOn: new Date(),
    },
    {
      text: "No matter how beautiful the sunset, it saddened her knowing she was one day older.",
      createdOn: new Date(),
    },
    {
      text: "The best key lime pie is still up for debate.",
      createdOn: new Date(),
    },
  ],
};

// export function noteReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_NOTE:
//       return {
//         ...state,
//         notes: [
//           ...state.notes,
//           {
//             text: action.text,
//             createdOn: new Date(),
//           },
//         ],
//       };
//     case DELETE_NOTE:
//       return {
//         ...state,
//         notes: state.notes.filter((note, i) => i !== action.index),
//       };
//     default:
//       return state;
//   }
// }

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.notes.push({
        text: action.payload,
        createdOn: new Date(),
      });
    },
    delete: (state, action) => {
      state.notes.splice(action.payload, 1);
    },
  },
});

export const noteReducer = noteSlice.reducer;
export const noteActions = noteSlice.actions;
export const noteSelector=(state)=>state.noteReducer.notes;
