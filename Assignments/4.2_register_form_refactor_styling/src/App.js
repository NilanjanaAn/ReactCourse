import "./styles.css";
//create a object to store all the styles.
export default function App() {
  return (
    <div className="App">
      {/* Refactor the inline style to use the internal style. */}
      <form style={styles.form}>
        {/* Refactor the inline style to use the internal style. */}
        <h3 style={styles.heading}>Sign Up</h3>
        <input style={styles.inputs} placeholder="Username" />
        <input style={styles.inputs} placeholder="Email" />
        <input style={styles.inputs} placeholder="Password" />
        {/* Refactor the inline style to use the internal style. */}
        <div style={styles.buttonsDiv}>
          {/* Refactor the inline style to use the internal style. */}
          <button style={styles.buttons}>Cancel</button>
          {/* Refactor the inline style to use the internal style. */}
          <button style={styles.buttons}>Login</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  buttons: {
    outline: "none",
    paddingBlock: 5,
    width: 100,
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
  },
  inputs: {
    padding: 10,
  },
  form: {
    width: "60%",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  heading: {
    fontSize: "2rem",
    letterSpacing: 2,
  },
};
