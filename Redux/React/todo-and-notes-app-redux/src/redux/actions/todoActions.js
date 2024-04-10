export const ADD_TODO = "Add TODO";
export const TOGGLE_TODO = "Toggle TODO";

export const addToDo = (text) => ({ text, type: ADD_TODO });
export const toggleToDo = (index) => ({ index, type: TOGGLE_TODO });
