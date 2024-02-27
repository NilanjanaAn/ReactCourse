import { Component } from "react";
import ComponentB from "./ComponentB";
import ErrorBoundary from "./ErrorBoundary";

class ComponentA extends Component {
  constructor() {
    super();
    this.state = {
      name: "ComponentA",
    };
    console.log("ComponentA constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("ComponentA getDerived");
    return null;
  }

  componentDidMount() {
    console.log("ComponentA didMount");
  }

  render() {
    console.log("ComponentA render");
    return (
      <>
        <h1>{this.state.name}</h1>
        <ErrorBoundary>
          <ComponentB />
        </ErrorBoundary>
      </>
    );
  }
}

export default ComponentA;
