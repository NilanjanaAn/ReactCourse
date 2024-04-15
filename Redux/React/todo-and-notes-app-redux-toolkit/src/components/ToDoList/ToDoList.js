import { toggleToDo } from "../../redux/actions/todoActions";
import "./ToDoList.css";
import { useSelector, useDispatch } from "react-redux";
import { todoActions, todoSelector } from "../../redux/reducers/todoReducer";

function ToDoList({ onToggle }) {
  // const todos = useSelector((state) => state.todoRed.todos);
  const todos = useSelector(todoSelector);
  const dispatch = useDispatch();
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
