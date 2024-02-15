import logo from './logo.svg';
import './App.css';
import Student from './Student';

function App() {
  return (
    <>
      <Student name="Harshit" marks={64}/>
      <Student name="Nilanjana" marks={42}/>
      <Student name="Parth" marks={8}/>
      <Student name="Aishwarya" marks={67}/>
      <Student name="Akshay" marks={85}/>
      <Student name="Sapna" marks={11}/>
      <Student/>
    </>
  )
}

Student.defaultProps={
  name: "Student",
  marks: 0
}

export default App;
