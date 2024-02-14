let score = 0;
let wicket = 0;
let perBall = [];
let hit = "";
let inputRef=React.createRef();

function scoreClick(increment) {
  if (wicket < 10) {
    perBall.push(increment);
    score += increment;
    rootElement.render(<App />);
  }
}

function wicketClick() {
  if (wicket < 10) {
    perBall.push("W");
    wicket += 1;
    if (wicket == 10) enableShow();
    rootElement.render(<App />);
  }
}

function scoreClick2(increment) {
  hit = increment;
  rootElement.render(<App />);
}

function wicketClick2() {
  hit = "W";
  rootElement.render(<App />);
}

var show = false;
function enableShow() {
  show = true;
  rootElement.render(<App />);
}

const ScoreButtons = () => (
  <div>
    <button onClick={() => scoreClick2(0)}>0</button>
    <button onClick={() => scoreClick2(1)}>1</button>
    <button onClick={() => scoreClick2(2)}>2</button>
    <button onClick={() => scoreClick2(3)}>3</button>
    <button onClick={() => scoreClick2(4)}>4</button>
    <button onClick={() => scoreClick2(6)}>6</button>
    <button onClick={wicketClick2}>WICKET</button>
  </div>
);

const PerBallResult = () => (
  <div>
    {perBall.map((res, index) => (
      <>
        {index % 6 === 0 && <br></br>}
        <span key={index} style={{ color: res === "W" ? "red" : "black" }}>
          {res === 0 ? <strong>.</strong> : res}&nbsp;&nbsp;&nbsp;
        </span>
      </>
    ))}
  </div>
);

const PerBallResult2 = () => (
  <div>
    {perBall.map((res, index) => (
      <>
        <p key={index}>
          {res === 0 ? <strong>.</strong> : res}&nbsp;&nbsp;&nbsp;
        </p>
	  	{index % 6 === 5 && <hr/>}
      </>
    ))}
  </div>
);

function handleSubmit(event) {
  event.preventDefault();
  if (hit === "W") wicket += 1;
  else score += hit;
//   perBall.unshift(<span>{hit}{","}{inputRef.current.value}</span>);
  perBall.unshift(<span style={{ color: hit === "W" ? "red" : "black" }}>{`${hit}`===0?".":`${hit}, ${inputRef.current.value}`}</span>);
  hit='';
  inputRef.current.value='';
  rootElement.render(<App />);
}

const Form = () => (
  <form onSubmit={handleSubmit}>
    <input value={hit} readOnly />
    <input ref={inputRef}/>
    <button>Submit</button>
  </form>
);

const App = () => (
  <>
    <h1>SCORE KEEPER</h1>
    <h2>
      SCORE: {score}/{wicket}
    </h2>
    <ScoreButtons />
    <br />
    <Form />
    <hr />
    <PerBallResult2 />
    {show && <h1>Game Over</h1>}
  </>
);
const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<App />);
