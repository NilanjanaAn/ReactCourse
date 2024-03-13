import { useState, useEffect } from "react";

export default function Input() {
  const [firstname, setFirstname] = useState("New");
  const [lastname, setLastname] = useState("User");

  // both cdm and cdu
  useEffect(() => {
    document.title=firstname+" "+lastname;
  });

  return (
    <>
      <div className="section">
        <Row label="Name">
          <input className="input" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        </Row>
        <Row label="Last Name">
          <input className="input"  value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
        </Row>
      </div>

      <h2>Hello, {firstname + " " + lastname}</h2>
    </>
  );
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
