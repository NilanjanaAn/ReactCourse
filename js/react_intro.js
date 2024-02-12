const jsxHeading = (
  <>
    <h1>About React</h1>
    <p>The library for web and native user interfaces</p>
    <ul>
      <li>Virtual DOM</li>
      <li>JavaScript XML (JSX)</li>
      <li>Component-Based Architecture</li>
    </ul>
  </>
);

//   function App() {
//     return (
//         <>
//             <h1>About React</h1>
//             <p>The library for web and native user interfaces</p>
//             <ul>
//             <li>Virtual DOM</li>
//             <li>JavaScript XML (JSX)</li>
//             <li>Component-Based Architecture</li>
//             </ul>
//         </>
//         )
//   }

function sum(p, q) {
  return p + q;
}

const header = <h2>JSX Expression</h2>;

var topic = "React";
var num1 = 3;
var num2 = 5;
var nullValue = null; // prints nothing
var nothing; // prints nothing
var bool = true; // must convery to string

const array1 = [1, 2, 3, 4, 5];
const obj1 = {
  name: "Nilanjana",
  age: 24,
};

function checkEven(num) {
  return !(num % 2);
}

const App = () => (
  <>
    {/* include one component inside another */}
    <Hello />
    <h1>About React</h1>
    <p>The library for web and native user interfaces</p>
    <ul>
      <li>Virtual DOM</li>
      <li>JavaScript XML (JSX)</li>
      <li>Component-Based Architecture</li>
    </ul>
  </>
);

// // Alternate code
// const Hello = () => <><h2>Hello new devs!</h2></>

const Hello = () => (
  <>
    <p>Hello new devs!</p>
  </>
);

function ShowVariable() {
  return (
    <>
      <h1>
        {num1} Features of {topic}
      </h1>
      {header}
      <p>The library for web and native user interfaces</p>
      <ul>
        <li>Virtual DOM</li>
        <li>JavaScript XML (JSX)</li>
        <li>Component-Based Architecture</li>
      </ul>
      <ol>
        <li>{nothing}</li>
        <li>{nullValue}</li>
        <li>{String(bool)}</li>
        <li>{sum(num1, num2)}</li>
        <li>{array1}</li>
        <li>
          <ul>
            {array1.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </li>
        <li>
          {obj1.name} {obj1.age}
        </li>
        <li>
          <ul>
            {array1.filter(checkEven).map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </li>
      </ol>
    </>
  );
}

const students = [
  {
    name: "Alice",
    age: 15,
    marks: 85,
    img: "https://cdn-icons-png.flaticon.com/256/2945/2945384.png",
  },
  {
    name: "Brent",
    age: 16,
    marks: 100,
    img: "https://cdn-icons-png.flaticon.com/256/1881/1881119.png",
  },
  {
    name: "Cyril",
    age: 14,
    marks: 90,
    img: "https://cdn-icons-png.flaticon.com/512/2880/2880587.png",
  },
];

function Student() {
  let showStudents = true;
  let loggedIn=true;
  let firstName="Roberta"
  let lastName="Brown"
  if (showStudents) {
    return (
      <>
      <h1>
        Hello Ms. {loggedIn?(lastName||firstName):"User"}
      </h1>
      {loggedIn && <p>Welcome to the portal</p>}
        <h3>Students Details</h3>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Age</th>
              <th>Marks</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.marks}</td>
                <td>
                  <img src={student.img}></img>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  else
  {
    return <h2>Not showing</h2>
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Student />
  </>
);
