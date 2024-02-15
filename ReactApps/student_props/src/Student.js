import {Component} from "react";

// class Student extends Component {
//   render() {
//     const {name,marks}=this.props
//     return(
//     <>
//         <h2>Hello, {name}</h2>
//         <p>You have secured {marks} %</p>
//         <hr/>
//     </>
//   )}
// }

function Student(props){
  const {name,marks}=props;
    return(
    <>
        <h2>Hello, {name}</h2>
        <p>You have secured {marks} %</p>
        <hr/>
    </>
  )
}

export default Student;
