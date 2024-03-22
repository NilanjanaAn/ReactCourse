import "./styles.css";
import { Navbar } from "./Navbar";
import { List } from "./List";
import CustomPostContext from "./postContext";

export default function App() {
  return (
    //Add the Context provider here
    <CustomPostContext>
      <div className="App">
        <Navbar />
        <List />
      </div>
    </CustomPostContext>
  );
}
