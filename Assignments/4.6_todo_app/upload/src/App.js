import "./styles.css";
import { Component } from "react";
import { List } from "./List";
import { Form } from "./Form";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { text: "Do the laundry" },
        { text: "Iron the clothes" },
        { text: "Go for a walk" },
      ],
    };
  }
  handleAdd = (todo) => {
    let { todos } = this.state;
    todos.unshift(
      { text: todo });
    this.setState(
    {
      todos
    });
  };

  handleRemove = (index) => {
    // complete the function to remove the Todo from the list
    let { todos } = this.state;
    todos.splice(index,1);
    this.setState
    ({
      todos
    });
  };
  render() {
    const {todos}=this.state;
    return (
      <div className="App">
        <span>Todo</span>
        {/* Pass the todos list and function as props to utilize those in the component for adding and removing */}
        <Form handleAdd={this.handleAdd}/>
        <List todos={todos} handleRemove={this.handleRemove}/>
      </div>
    );
  }
}
