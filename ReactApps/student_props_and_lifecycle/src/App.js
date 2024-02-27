import ComponentA from "./ComponentA";
import Student from "./Student";
import { Component } from "react";
import Timer from "./Timer";

class App extends Component {
  constructor()
  {
    super();
    this.state={
      mount: false,
      start: false
    }
  }
  handleMount=()=>{
    this.setState((prevState)=>({mount:!prevState.mount}));
  }
  startStop = () => {
    this.setState((prevState)=>({
        start: !prevState.start
    }))
  };
  render() {
    return (
      <>
        {this.state.mount?<Timer start={this.state.start}/>:null}
        <button onClick={this.handleMount}>{this.state.mount?"UNMOUNT":"MOUNT"}</button>
        <button onClick={this.startStop}>
          {this.state.start ? "STOP" : "START"}
        </button>
        <ComponentA />
        <Student name="Harshit" marks={64} />
        <Student name="Nilanjana" marks={42} />
        <Student name="Parth" marks={8} />
        <Student name="Aishwarya" marks={67} />
        <Student name="Akshay" marks={85} />
        <Student name="Sapna" marks={11} />
        <Student />
      </>
    );
  }
}

Student.defaultProps = {
  name: "Student",
  marks: 0,
};

export default App;
