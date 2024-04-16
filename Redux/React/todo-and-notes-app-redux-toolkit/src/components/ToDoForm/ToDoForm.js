import { useState } from "react";
import "./ToDoForm.css";
import { useDispatch, useSelector } from "react-redux";
// import { addToDo } from "../../redux/actions/todoActions";
import { addTodoAsync, todoActions } from "../../redux/reducers/todoReducer";
import {
  notificationSelector,
  notificationActions,
} from "../../redux/reducers/notificationReducer";

function ToDoForm({ onCreateTodo }) {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoText("");
    // dispatch(addToDo(todoText));
    // dispatch(todoActions.add(todoText));
    dispatch(addTodoAsync(todoText));
  };

  const message = useSelector(notificationSelector);

  if (message) {
    setTimeout(() => {
      dispatch(notificationActions.reset());
    }, 3000);
  }

  return (
    <div className="container">
      {message ? (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button className="btn btn-success float-end" type="submit">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default ToDoForm;
