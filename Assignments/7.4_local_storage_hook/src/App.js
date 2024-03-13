import "./styles.css";
import { useRef, useEffect, useState } from "react";

export default function App() {
  // Use the custom local storage hook here

  const[name, setName] = useState("");
  const[age, setAge] = useState(1);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setAge(localStorage.getItem("age"));
  },[]);

  const nameInput = useRef();
  const ageInput = useRef();

  const handleClear = () => {
    nameInput.current.value = "";
    ageInput.current.value = "";
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = nameInput.current.value;
    const age = ageInput.current.value;

    // Set the name and age here
    setName(name);
    setAge(age);
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);

    handleClear();
  };

  return (
    <div className="App">
      <div id="name">Name -{name}</div>
      <div id="age">Age -{age}</div>
      <form onSubmit={handleChange}>
        <input placeholder="Name" ref={nameInput} />
        <input placeholder="Age" type="number" min="1" ref={ageInput} />
        <button className="btn">Change</button>
      </form>
    </div>
  );
}
