import "./styles.css";
import { Actions } from "./components/Actions";
import { Timer } from "./components/Timer";
import { Provider } from "react-redux";
import { store } from "./store";
//  add redux imports here

export default function App() {
  return (
    // Provide the provider here for Timer and actions
    <Provider store={store}>
      <div className="App">
        <h1>Simple Timer</h1>
        <Timer />
        <Actions />
      </div>
    </Provider>
  );
}
