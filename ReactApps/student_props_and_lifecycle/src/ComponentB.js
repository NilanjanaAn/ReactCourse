import { Component } from "react";
import './index.css'

class ComponentB extends Component {
  constructor() {
    super();
    this.state = {
      name: "ComponentB",
      data: [],
    };
    console.log("ComponentB constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("ComponentB getDerived");
    return null;
  }

  componentDidMount() {
    console.log("ComponentB didMount");
    // // forcibly create error
    // fetch("https://jsonplaceholder.typicode.com/user") 
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  render() {
    console.log("ComponentB render");
    return (
      <>
        <h2>{this.state.name}</h2>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Username</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Company Name</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ComponentB;
