import { toggleToDo } from "../../redux/actions/todoActions";
import "./ToDoList.css";
import { useSelector, useDispatch } from "react-redux";
import { getInitStateAsync, todoActions, todoSelector } from "../../redux/reducers/todoReducer";
import { useEffect } from "react";
import axios from "axios";

function ToDoList({ onToggle }) {
  // const todos = useSelector((state) => state.todoRed.todos);
  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch("http://localhost:4100/api/todos")
    //   .then((res) => res.json())
    //   .then((parsedJson) => {
    //     console.log(parsedJson);
    //   });

    // axios.get("http://localhost:4100/api/todos").then((res) => {
    //   console.log(res.data);
    //   dispatch(todoActions.setInit(res.data));
    // });

    dispatch(getInitStateAsync());
  }, []);

  return (
    <div className="container">
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span className="content">{todo.text}</span>
            <span className={todo.completed ? "completed" : "pending"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
            <button
              className="btn btn-warning"
              onClick={() => {
                // dispatch(toggleToDo(index));
                dispatch(todoActions.toggle(index));
              }}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
