import React from "react";

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Timer",
      count: 0,
      time: 0,
    };
    this.timer = null; // an interval
    console.log("Timer constructor");
  }

  buttonClick = () => {
    this.setState((prevState) => {
      return { count: prevState.count + 1 };
    });
  };

  static getDerivedStateFromProps(props, state) {
    console.log("Timer getDerived");
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.start !== this.props.start || nextState.time % 5 === 0;
  }

  render() {
    console.log("Timer render");
    return (
      <>
        <h1>
          Time Spent:{" "}
          {new Date(this.state.time * 1000).toISOString().slice(11, 19)}
        </h1>
        <button onClick={this.buttonClick}>{this.state.count}</button>
      </>
    );
  }

  componentDidMount() {
    console.log("Timer didMount\n________________________________");
  }

  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log("Timer getSnapshot");
    console.log("PrevProps:", prevProps);
    console.log("PrevState:", prevState);
    return 5;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Timer didUpdate\n________________________________");
    console.log("Snapshot:", snapshot);

    if (prevProps.start !== this.props.start) {
      if (this.props.start) {
        this.timer = setInterval(() => {
          this.setState((prevState) => ({ time: prevState.time + 1 }));
        }, 1000);
      } else clearInterval(this.timer);
    }
    // this.timer = setInterval(() => {
    //   this.setState({ time: 0 });
    // }, 5000);
  }

  componentWillUnmount() {
    console.log("Timer willUnmount");
    clearInterval(this.timer);
  }
}

export default Timer;
