import React from "react";

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "New",
      lastname: "User",
    };
  }
  changeName = (value, type) => {
    if (type === 1) {
      this.setState({ firstname: value });
    } else if (type === 2) {
      this.setState({ lastname: value });
    }
  };
  componentDidMount() {
    document.title = this.state.firstname + " " + this.state.lastname;
  }
  componentDidUpdate(prevProps, prevState) {
    document.title = this.state.firstname + " " + this.state.lastname;
  }
  render() {
    return (
      <>
        <div className="section">
          <Row label="Name">
            <input
              className="input"
              onChange={(e) => this.changeName(e.target.value, 1)}
            />
          </Row>
          <Row label="Last Name">
            <input
              className="input"
              onChange={(e) => this.changeName(e.target.value, 2)}
            />
          </Row>
        </div>

        <h2>Hello, {this.state.firstname + " " + this.state.lastname}</h2>
      </>
    );
  }
}

function Row(props) {
  const { label } = props;
  return (
    <>
      <lable>
        {label}
        <br />
      </lable>
      {props.children}
      <hr />
    </>
  );
}
